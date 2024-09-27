import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ImageUpService } from 'src/app/services/imageUp.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent {

  listProductos: Producto[]=[];


  constructor(private _productoService: ProductoService){}

  ngOnInit(): void{
    this.obtenerProductos();
  }

  obtenerProductos(){
    this._productoService.getProductos().subscribe(data=>{
      console.log(data);
      this.listProductos= data;
    }, error=>{
      console.log(error);
    })
  }
  eliminarProducto(id:any){
    this._productoService.eliminarProducto(id).subscribe(data =>{
      this.obtenerProductos();
    },error=>{
      console.log(error);
    })
  }
}
