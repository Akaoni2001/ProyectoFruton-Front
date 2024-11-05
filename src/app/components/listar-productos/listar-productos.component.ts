import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})

//clase
export class ListarProductosComponent {

  listProductos: Producto[]=[];
  listCategoria: Categoria[]=[];
  iconoOcultar: string = "fa-solid fa-eye";
  buscar_categoria: string = "";
  mensajeAlerta: string = '';

  constructor(private _productoService: ProductoService,
    private _categoriaService: CategoriaService
  ){}

  ngOnInit(): void{
    this.obtenerProductos();
    this.obtenerCategoria();
  }

  ocultar(){
    if(this.iconoOcultar=="fa-solid fa-eye"){
      this.iconoOcultar = "fa-solid fa-eye-low-vision";
    }else{
      this.iconoOcultar="fa-solid fa-eye";
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

}
