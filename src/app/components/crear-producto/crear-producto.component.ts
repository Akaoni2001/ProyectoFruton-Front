import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageUpService } from 'src/app/services/imageUp.service';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {

  productoForm: FormGroup;
  titulo='Crear producto';
  id:string | null;
  listCategoria: Categoria[] = [];

 //firebase

 uploadPercent: number | undefined;
 downloadURL: string;
 localURL : File;

  selectedFile: File | null = null;
  selectedFileUrl: string | ArrayBuffer | null = null;

  constructor(private fb:FormBuilder,
    private router: Router,
    private _productoService:ProductoService,
    private _imagenService: ImageUpService,
    private _categoriaService:CategoriaService,
    private aRouter: ActivatedRoute,
    private storage: AngularFireStorage) {
    this.productoForm=this.fb.group({
      producto: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
      imagen: [null]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.downloadURL = "";
    this.localURL = null as any;
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    this.productoForm.patchValue({ imagen: file });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('nombre', this.productoForm.get('nombre')?.value);
    formData.append('descripcion', this.productoForm.get('descripcion')?.value);
    formData.append('categoria', this.productoForm.get('categoria')?.value);
    formData.append('precio', this.productoForm.get('precio')?.value);
    formData.append('stock', this.productoForm.get('stock')?.value);
    formData.append('image', this.productoForm.get('imagen')?.value);

    // Subir la imagen y los detalles del producto
    this._imagenService.uploadImage(formData).subscribe((response) => {
      console.log('Producto creado con imagen:', response);
      // Aquí puedes llamar al servicio de productos si quieres guardar otros detalles
    });
  }

  ngOnInit():void{
    this.esEditar();
    this.obtenerCategorias();
  }

  async agregarProducto(){
    console.log(this.productoForm);
    console.log(this.productoForm.get('producto')?.value);

    if(this.localURL != null){
      await this.uploadFile();
    }
    const PRODUCTO: Producto = {
      nombre:this.productoForm.get('producto')?.value,
      descripcion:this.productoForm.get('descripcion')?.value,
      categoria:this.productoForm.get('categoria')?.value,
      precio:this.productoForm.get('precio')?.value,
      stock:this.productoForm.get('stock')?.value,
      imagen:this.downloadURL,
      estado:true
    }

    if(this.id !==null){
      //editamos producto
        this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data=>{
        this.router.navigate(['/listar-productos']);
      },error=>{
        console.log(error);
        this.productoForm.reset();
      })
    } else{
      //agregamos producto
        console.log(PRODUCTO);
        this._productoService.guardarProducto(PRODUCTO).subscribe(data=>{
        this.router.navigate(['/listar-productos']);
        },error=>{
          console.log(error);
          this.productoForm.reset();
        })
    } 
  }

  esEditar(){
    if(this.id !== null){
      this.titulo= 'Editar producto';
      this._productoService.obtenerProducto(this.id).subscribe(data=>{
        this.productoForm.setValue({
          producto: data.nombre,
          descripcion: data.descripcion,
          categoria: data.categoria,
          precio: data.precio,
          stock: data.stock,
          imagen: this.selectedFile
        })
        this.selectedFileUrl = data.imagen;
        this.downloadURL= data.imagen })
    }
  }

  obtenerCategorias() {
    this._categoriaService.getCategorias().subscribe(
      data => {
        console.log(data);
        this.listCategoria = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.localURL = event.target.files[0];
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFileUrl = e.target.result;
        };
        reader.readAsDataURL(this.selectedFile);
      }
      if(this.downloadURL != null){
        this.eliminarImagen(this.downloadURL);
      }  
    }
    
  }


  async uploadFile() {
    return new Promise<void>((resolve, reject) => {
      const filePath = `images/${this.localURL.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.localURL);
  
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(
            (url) => {
              this.downloadURL = url;
              resolve();
            },
            (error) => reject(error)
          );
        })
      ).subscribe();
    });
  }



  //eliminar imagen del firebase
  eliminarImagen(url: string) {
    const fileRef = this.storage.refFromURL(url);

    fileRef.delete().subscribe(
      () => {
        console.log('Imagen eliminada exitosamente');
      },
      (error) => {
        console.error('Error al eliminar la imagen:', error);
      }
    );
  }

}