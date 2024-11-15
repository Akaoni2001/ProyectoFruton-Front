import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoProducto } from 'src/app/models/tipo-producto';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { SidenavComponent } from '../sidenav/sidenav.component';
@Component({
  selector: 'app-crear-tipoproducto',
  templateUrl: './crear-tipoproducto.component.html',
  styleUrl: './crear-tipoproducto.component.css'
})
export class CrearTipoproductoComponent {
  tipoproductoForm: FormGroup;
  titulo='Crear tipo de producto';
  id:string | null;
  categorias: any[] = [];

  constructor(private fb:FormBuilder,
    private router: Router,
    private _tipoproductoService:TipoProductoService,
    private _categoriaService: CategoriaService,
    private aRouter: ActivatedRoute) {
    this.tipoproductoForm=this.fb.group({
      producto: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required]
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
    formData.append('nombre', this.tipoproductoForm.get('nombre')?.value);
    formData.append('descripcion', this.tipoproductoForm.get('descripcion')?.value);
    formData.append('categoria', this.tipoproductoForm.get('categoria')?.value);
    formData.append('precio', this.tipoproductoForm.get('precio')?.value);
    formData.append('stock', this.tipoproductoForm.get('stock')?.value);

  }

  ngOnInit():void{
    this.esEditar();
    this.cargarCategorias();
  }

  async agregarTipoProducto(){
    console.log(this.tipoproductoForm);
    console.log(this.tipoproductoForm.get('producto')?.value);

    const PRODUCTO: TipoProducto = {
      nombre:this.tipoproductoForm.get('producto')?.value,
      descripcion:this.tipoproductoForm.get('descripcion')?.value,
      categoria:this.tipoproductoForm.get('categoria')?.value,
      precio:this.tipoproductoForm.get('precio')?.value,
      stock:this.tipoproductoForm.get('stock')?.value,
    }

    if(this.id !==null){
      //editamos producto
        this._tipoproductoService.editarTipoProducto(this.id, PRODUCTO).subscribe(data=>{
        this.router.navigate(['/tipo-producto']);
      },error=>{
        console.log(error);
        this.tipoproductoForm.reset();
      })
    } else{
      //agregamos producto
        console.log(PRODUCTO);
        this._tipoproductoService.guardarTipoProducto(PRODUCTO).subscribe(data=>{
        this.router.navigate(['/tipo-producto']);
        },error=>{
          console.log(error);
          this.tipoproductoForm.reset();
        })
    } 
  }

  esEditar(){
    if(this.id !== null){
      this.titulo= 'Editar tipo de producto';
      this._tipoproductoService.obtenerTipoProducto(this.id).subscribe(data=>{
        this.tipoproductoForm.setValue({
          producto: data.nombre,
          descripcion: data.descripcion,
          categoria: data.categoria,
          precio: data.precio,
          stock: data.stock
        }) })
    }
  }
}
