import { Component } from '@angular/core';
import { TipoProducto } from 'src/app/models/tipo-producto';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';

@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.component.html',
  styleUrls: ['./tipo-producto.component.css']
})
export class TipoProductoComponent {

  listProductos: TipoProducto[]=[];
  

  constructor(private _tipoproductoService: TipoProductoService){}

  ngOnInit(): void{
    this.obtenerTipoProductos();
  }

  obtenerTipoProductos(){
    this._tipoproductoService.getTipoProductos().subscribe(data=>{
      console.log(data);
      this.listProductos= data;
    }, error=>{
      console.log(error);
    })
  }

  eliminarTipoProducto(id:any){
    this._tipoproductoService.eliminarTipoProducto(id).subscribe(data =>{
      this.obtenerTipoProductos();
    },error=>{
      console.log(error);
    })
  }
}
