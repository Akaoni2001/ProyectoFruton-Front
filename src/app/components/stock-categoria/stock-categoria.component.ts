import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stock-categoria',
  templateUrl: './stock-categoria.component.html',
  styleUrl: './stock-categoria.component.css'
})
export class StockCategoriaComponent {

  listProductos: Producto[] = [];
  listCategoria: Categoria[] = [];
  stockPorCategoria: { [key: string]: number } = {}; // Nuevo objeto para almacenar el stock por categoría
  productosPorCategoria: Producto[] = []; // Array para almacenar productos de una categoría específica
  mostrarModal: boolean = false; // Variable para controlar la visibilidad del modal

  constructor(
    private _productoService: ProductoService,
    private _categoriaService: CategoriaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategoria();
  }

  obtenerProductos(): void {
    this._productoService.getProductos().subscribe(
      data => {
        this.listProductos = data;
        this.calcularStockPorCategoria(); // Llamada para calcular el stock por categoría después de obtener los productos
      },
      error => {
        console.log(error);
      }
    );
  }

  obtenerCategoria(): void {
    this._categoriaService.getCategorias().subscribe(
      data => {
        this.listCategoria = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  calcularStockPorCategoria(): void {
    this.stockPorCategoria = {};

    this.listProductos.forEach(producto => {
      const categoria = producto.categoria;
      if (this.stockPorCategoria[categoria]) {
        this.stockPorCategoria[categoria] += producto.stock;
      } else {
        this.stockPorCategoria[categoria] = producto.stock;
      }
    });
  }

  abrirModal(categoria: string): void {
    this.productosPorCategoria = this.listProductos.filter(producto => producto.categoria === categoria);
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.productosPorCategoria = [];
  }

  mostrarError(mensaje: string, Titulo: string): void {
    this.toastr.error(mensaje, Titulo, { positionClass: 'toast-top-right' });
  }

}
