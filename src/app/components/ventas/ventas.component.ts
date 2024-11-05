import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { Venta } from 'src/app/models/venta';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css',
  animations: [
    trigger('rowAnimation', [
      transition(':enter', [
        style({ opacity: 0, height: 0, transform: 'translateY(-10px)' }), // Estado inicial: oculto y desplazado hacia arriba
        animate('300ms ease-out', style({ opacity: 1, height: '*', transform: 'translateY(0)' })) // Estado final: visible
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, height: 0, transform: 'translateY(-10px)' })) // Regresa hacia arriba al ocultarse
      ])
    ])
  ]
})
export class VentasComponent {

  isVisible = {
    elemento1: true,
    elemento2: false
  };

  total:number=0;
  productos: Producto[] = [];
  listaVentas: Venta[]=[];

  vuelto: number=0;
  listVentas: Venta[] = [];
  listCategorias: Categoria[] = [];
  listaPedidos: any[]= [];
  productoSeleccionado: any=null;
  brillo: number=1;
  ;

  constructor(
    private _ventasService: VentaService,
    private _productosService: ProductoService,
    private _categoriaService: CategoriaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
    this.obtenerVentas();
    
  }

  sumT(valor:number){
    this.total += valor;
  }

  abrirModal() {    
    this.isVisible.elemento2 = true;
    this.brillo = 0.6;    
  }

  closeModal(){
    this.brillo=1;
    this.isVisible.elemento2=false;
  }

  calcularVuelto(montoEntregado:string) {
    this.vuelto = parseFloat(montoEntregado) >= this.total ? parseFloat(montoEntregado) - this.total : (alert('El monto entregado es insuficiente'), 0);
  }

  obtenerProductos() {
    this._productosService.getProductos().subscribe(data => {
      console.log(data);
      this.productos = data;
    }, error => {
      console.log(error);
    });
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

    
    this.verifica();
    if(salir) return;

    this._productosService.getProductos().subscribe(data => {
      data.forEach((producto: any) => {
        if ((producto as { nombre: string }).nombre === nombreProducto) {
          producto.cantidad = 1;
          this.sumT(producto.precio); 
          this.listaPedidos.push(producto);
          this.verifica();
        }
      });
  
      console.log(this.listaPedidos);
    }, error => {
      console.log(error);
    });

    
    this.verifica();
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
    
    this.verifica();
  }
  
  obtenerVentas(){
    this._ventasService.getVentas().subscribe(data => {
      console.log(data);
      this.listVentas = data;
    }, error => {
      console.log(error);
    });
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

  
  verifica(){
    if(this.listaPedidos.length==0){
      this.isVisible.elemento1=true;
    }else{
      this.isVisible.elemento1=false;
    }
  }

  registrarVenta(nombreCliente:string) {
      const cantidades = this.listaPedidos.map(producto=> producto.cantidad);

      const nuevaVenta: Venta = {
        nombreCliente : nombreCliente,
        productos: this.listaPedidos,
        cantidades: cantidades,
        precioTotal: this.total,
        fechaVenta: new Date()
      };

      this._ventasService.addVenta(nuevaVenta).subscribe(
        data => {
          console.log(data);
          this.listVentas.push(data);
        },
        error => {
          console.error('Error al agregar categoría:', error);
        }
      );
      this.mostrarSatisfaccion("Venta realizada con éxito", "Venta registrada");
      this.listaPedidos=[];
      this.total=0;
      this.closeModal();
      this.isVisible.elemento1=true;
  }

  mostrarSatisfaccion(mensaje:string, Titulo:string) {
    this.toastr.success(mensaje, Titulo,
      {positionClass : "toast-top-right",}
   );
  }


  //aparte
  expandedRows: Set<number> = new Set();

  toggleRow(index: number) {
    if (this.expandedRows.has(index)) {
      this.expandedRows.delete(index);
    } else {
      this.expandedRows.add(index);
    }
  }

  isRowExpanded(index: number): boolean {
    return this.expandedRows.has(index);
  }
/* 
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
    */
}
