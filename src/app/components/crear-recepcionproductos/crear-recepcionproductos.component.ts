import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecepcionProductos } from 'src/app/models/recepcion-productos';
import { RecepcionProductosService } from 'src/app/services/recepcion-productos.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { SidenavComponent } from '../sidenav/sidenav.component';
@Component({
  selector: 'app-crear-recepcionproductos',
  templateUrl: './crear-recepcionproductos.component.html',
  styleUrl: './crear-recepcionproductos.component.css'
})
export class CrearRecepcionproductosComponent {
  recepcionproductosForm: FormGroup;
  titulo='Nueva recepcion de producto';
  id:string | null;
  categorias: any[] = [];

  constructor(private fb:FormBuilder,
    private router: Router,
    private _recepcionproductosService:RecepcionProductosService,
    private _categoriaService: CategoriaService,
    private aRouter: ActivatedRoute) {
    this.recepcionproductosForm=this.fb.group({
      producto: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      estado: ['', Validators.required],
      precio: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  cargarCategorias() {
    this._categoriaService.getCategorias().subscribe(data => {
      this.categorias = data;
    }, error => {
      console.log(error);
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('nombre', this.recepcionproductosForm.get('nombre')?.value);
    formData.append('descripcion', this.recepcionproductosForm.get('descripcion')?.value);
    formData.append('categoria', this.recepcionproductosForm.get('categoria')?.value);
    formData.append('estado', this.recepcionproductosForm.get('estado')?.value);
    formData.append('precio', this.recepcionproductosForm.get('precio')?.value);
  }

  ngOnInit():void{
    this.esEditar();
    this.cargarCategorias();
  }

  async agregarRecepcionProducto(){
    console.log(this.recepcionproductosForm);
    console.log(this.recepcionproductosForm.get('producto')?.value);

    const PRODUCTO: RecepcionProductos = {
      nombre:this.recepcionproductosForm.get('producto')?.value,
      descripcion:this.recepcionproductosForm.get('descripcion')?.value,
      categoria:this.recepcionproductosForm.get('categoria')?.value,
      estado:this.recepcionproductosForm.get('estado')?.value,
      precio:this.recepcionproductosForm.get('precio')?.value
    }

    if(this.id !==null){
      //editamos producto
        this._recepcionproductosService.editarRecepcionProducto(this.id, PRODUCTO).subscribe(data=>{
        this.router.navigate(['/recepcion-productos']);
      },error=>{
        console.log(error);
        this.recepcionproductosForm.reset();
      })
    } else{
      //agregamos producto
        console.log(PRODUCTO);
        this._recepcionproductosService.guardarRecepcionProducto(PRODUCTO).subscribe(data=>{
        this.router.navigate(['/recepcion-productos']);
        },error=>{
          console.log(error);
          this.recepcionproductosForm.reset();
        })
    } 
  }

  esEditar(){
    if(this.id !== null){
      this.titulo= 'Editar la recepción de productos';
      this._recepcionproductosService.obtenerRecepcionProducto(this.id).subscribe(data=>{
        this.recepcionproductosForm.setValue({
          producto: data.nombre,
          descripcion: data.descripcion,
          categoria: data.categoria,
          estado: data.estado,
          precio: data.precio
        }) })
    }
  }
}
