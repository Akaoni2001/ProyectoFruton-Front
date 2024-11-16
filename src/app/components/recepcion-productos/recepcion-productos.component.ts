import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { RecepcionProductos } from 'src/app/models/recepcion-productos';
import { RecepcionProductosService } from 'src/app/services/recepcion-productos.service';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-recepcion-productos',
  templateUrl: './recepcion-productos.component.html',
  styleUrl: './recepcion-productos.component.css'
})
export class RecepcionProductosComponent {
  listProductos: RecepcionProductos[]=[];
  categorias: any[] = [];
  

  constructor(private _recepcionproductoService: RecepcionProductosService, private _categoriaService: CategoriaService){}

  ngOnInit(): void{
    this.cargarDatos();  // Cargar productos y categorías al mismo tiempo
  }

  cargarDatos() {
    // forkJoin asegura que ambas llamadas se completen antes de continuar
    forkJoin({
      productos: this._recepcionproductoService.getRecepcionProductos(),
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

  eliminarRecepcionProducto(id:any){
    this._recepcionproductoService.eliminarRecepcionProducto(id).subscribe(data =>{
      this.cargarDatos(); 
    },error=>{
      console.log(error);
    })
  }
}
