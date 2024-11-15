import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TipoProducto } from 'src/app/models/tipo-producto';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.component.html',
  styleUrl: './tipo-producto.component.css'
})
export class TipoProductoComponent {
  listProductos: TipoProducto[]=[];
  categorias: any[] = [];
  

  constructor(private _tipoproductoService: TipoProductoService, private _categoriaService: CategoriaService){}

  ngOnInit(): void{
    this.cargarDatos();  // Cargar productos y categorías al mismo tiempo
  }

  cargarDatos() {
    // forkJoin asegura que ambas llamadas se completen antes de continuar
    forkJoin({
      productos: this._tipoproductoService.getTipoProductos(),
      categorias: this._categoriaService.getCategorias()
    }).subscribe(({ productos, categorias }) => {
      this.listProductos = productos;
      this.categorias = categorias;
      this.asociarNombresCategorias();  // Asocia los nombres de las categorías a los productos
    }, error => {
      console.log(error);
    });
  }

  asociarNombresCategorias() {
    this.listProductos.forEach(producto => {
      const categoria = this.categorias.find(cat => cat._id === producto.categoria);
      if (categoria) {
        producto.categoria = categoria.nombreCategoria;  // Añade el nombre de la categoría al producto
      }
    });
  }

  eliminarTipoProducto(id:any){
    this._tipoproductoService.eliminarTipoProducto(id).subscribe(data =>{
      this.cargarDatos(); 
    },error=>{
      console.log(error);
    })
  }
}
