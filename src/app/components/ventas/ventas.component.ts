import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { Venta } from 'src/app/models/venta';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {

  listVentas: Venta[] = [];
  productos: Producto[] = [];
  newVenta: Venta = {
    nombreCliente: '',
    producto: new Producto('', '', '', 0, 0,''),
    cantidad: 0,
    precioProducto: 0,
    fechaVenta: new Date()
  };

  constructor(
    private _ventasService: VentaService,
    private _productosService: ProductoService
  ) { }

  ngOnInit(): void {
    this.obtenerVentas();
    this.obtenerProductos();
  }

  obtenerVentas() {
    this._ventasService.getVentas().subscribe(data => {
      console.log(data);
      this.listVentas = data;
    }, error => {
      console.log(error);
    });
  }

  obtenerProductos() {
    this._productosService.getProductos().subscribe(data => {
      console.log(data);
      this.productos = data;
    }, error => {
      console.log(error);
    });
  }

  onSubmit(): void {
    this.newVenta.fechaVenta = new Date();
    this._ventasService.addVenta(this.newVenta).subscribe((venta) => {
      this.listVentas.push(venta);
      this.newVenta = {
        nombreCliente: '',
        producto: new Producto('', '', '', 0, 0,''),
        cantidad: 0,
        precioProducto: 0,
        fechaVenta: new Date()
      };
    });
  }
}
