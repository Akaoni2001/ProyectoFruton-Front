import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {

  productoForm: FormGroup;
  titulo='Crear producto';
  id:string | null;

  selectedFile: File | null = null;
  selectedFileUrl: string | ArrayBuffer | null = null;

  constructor(private fb:FormBuilder,
    private router: Router,
    private _productoService:ProductoService,
    private aRouter: ActivatedRoute) {
    this.productoForm=this.fb.group({
      producto: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
      imagen: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit():void{
    this.esEditar();
  }

  agregarProducto(){
    console.log(this.productoForm);
    console.log(this.productoForm.get('producto')?.value);

    const PRODUCTO: Producto = {
      nombre:this.productoForm.get('producto')?.value,
      descripcion:this.productoForm.get('descripcion')?.value,
      categoria:this.productoForm.get('categoria')?.value,
      precio:this.productoForm.get('precio')?.value,
      stock:this.productoForm.get('stock')?.value,
      imagen:this.productoForm.get('imagen')?.value,
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
          imagen: data.imagen
        })
      })
    }
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFileUrl = e.target.result;
        };
        reader.readAsDataURL(this.selectedFile);
      }
    }
  }
}
