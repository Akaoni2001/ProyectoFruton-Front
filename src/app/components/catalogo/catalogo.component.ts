import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  
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

}
