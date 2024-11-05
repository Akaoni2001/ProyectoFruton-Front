import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})

//clase
export class ListarProductosComponent {

  listProductos: Producto[]=[];
  listCategoria: Categoria[]=[];

  iconos: string[]=[];
  buscar_categoria: string = "";
  mensajeAlerta: string = '';

  constructor( private router: Router,
    private _productoService: ProductoService,
    private _categoriaService: CategoriaService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void{
    this.obtenerProductos();
    this.obtenerCategoria();
  }

  ocultar(i:number, estado:boolean){
    if(estado){
      this.iconos[i] = "fa-solid fa-eye-low-vision";
    }else{
      this.iconos[i]="fa-solid fa-eye";
    }
  }

  obtenerProductos(){
    this._productoService.getProductos().subscribe(data=>{
      console.log(data);
      this.listProductos= data;
    }, error=>{
      console.log(error);
    })
  }

  buscarProducto(){
    if(this.buscar_categoria=='todos'){
      this.obtenerProductos();
    }else{
    this._productoService.getProductos().subscribe(data=>{
      console.log(data);
      this.listProductos= data.filter((producto: Producto) =>producto.categoria==this.buscar_categoria);
    }, error=>{
      console.log(error);
    })
    }
  }

  obtenerCategoria(){
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

  actualizarEstado(idProducto:string|undefined, estado:boolean, i:number){
    if((this.listProductos.find(p =>p._id === idProducto))!.stock !=0){
      this._productoService.actualizarEstado(idProducto, !estado).subscribe(data=>{},
        error=>{
        console.log(error);
      })
      this.listProductos[i].estado=!estado;
    }else{
      this.mostrarError("Producto sin stock", "Acción no válida")
    }
    
    
}

mostrarError(mensaje:string, Titulo:string) {
    this.toastr.error(mensaje, Titulo,
      {positionClass : "toast-top-right",}
   );
  }

}
