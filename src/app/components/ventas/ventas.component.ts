import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { Venta } from 'src/app/models/venta';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {

  isVisible:boolean=false;
  total:number=0;
  vuelto: number=0;
  listVentas: Venta[] = [];
  productos: Producto[] = [];
  listCategorias: Categoria[] = [];
  listaPedidos: any[]= [];
  newVenta: Venta = {
    nombreCliente: '',
    producto: new Producto('', '', '', 0, 0,''),
    cantidad: 0,
    precioProducto: 0,
    fechaVenta: new Date()
  }
  
  productoSeleccionado: any=null;
  brillo: number=1;
  ;

  constructor(
    private _ventasService: VentaService,
    private _productosService: ProductoService,
    private _categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.obtenerVentas();
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  sumT(valor:number){
    this.total += valor;
  }

  abrirModal() {    
    this.isVisible = true;
    this.brillo = 0.6;    
  }

  closeModal(){
    this.brillo=1;
    this.isVisible=false;
  }

  calcularVuelto(montoEntregado:string) {
    this.vuelto = parseFloat(montoEntregado) >= this.total ? parseFloat(montoEntregado) - this.total : (alert('El monto entregado es insuficiente'), 0);
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

  verifica(){
    if(this.listaPedidos.length==0){
      this.isVisible=true;
    }else{
      this.isVisible=false;
    }
  }

  obtenerPedido(nombreProducto:any){

    var salir = false;
    
    this.listaPedidos.forEach((producto, index) => {
      if (producto.nombre === nombreProducto) {
          this.listaPedidos[index].cantidad += 1;
          this.sumT(producto.precio);
          salir = true;
      }
    })

    if(salir) return;

    this._productosService.getProductos().subscribe(data => {
      data.forEach((producto: any) => {
        if ((producto as { nombre: string }).nombre === nombreProducto) {
          producto.cantidad = 1;
          this.sumT(producto.precio); 
          this.listaPedidos.push(producto);
          
        }
      });
  
      console.log(this.listaPedidos);
    }, error => {
      console.log(error);
    });
  }


  eliminarPedido(nombreProducto:any){
    
    this.listaPedidos.forEach((producto, index) => {
      if (producto.nombre === nombreProducto) {
          if(producto.cantidad>1){
          this.listaPedidos[index].cantidad -= 1;
          this.sumT(producto.precio*-1);
          }else{
            this.listaPedidos.splice(index,1);
            this.sumT(producto.precio*-1);
          }
        }
    })
  }
  

  obtenerCategorias() {
    this._categoriaService.getCategorias().subscribe(data => {
      console.log(data);
      this.listCategorias = data;
    }, error => {
      console.log(error);
    });
  }

  filtrarCategoria(categoria:any){
    this._productosService.getProductos().subscribe(data => {
      console.log(data);
      this.productos = data.filter((producto:any) => (producto as{categoria:string}).categoria == categoria);
    
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
