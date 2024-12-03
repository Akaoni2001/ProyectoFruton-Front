import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { Venta } from 'src/app/models/venta';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import jsPDF from 'jspdf';

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
  notaCreditoForm: FormGroup;
  isVentaRegistrable = false;

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

  constructor(private fb: FormBuilder,
    private _ventasService: VentaService,
    private _productosService: ProductoService,
    private _categoriaService: CategoriaService,
    private toastr: ToastrService
  ) { this.notaCreditoForm = this.fb.group({
    cliente: [''],
    monto: [''],
    descripcion: ['']
  });}

  generarNota(){
    const formData = this.notaCreditoForm.value;

    const doc = new jsPDF();

    // Título con diseño
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Fruton', 105, 20, { align: 'center' });

    doc.setFontSize(16);
    doc.text('Nota de Crédito', 105, 30, { align: 'center' });

    // Línea separadora
    doc.setLineWidth(0.5);
    doc.line(10, 35, 200, 35);

    // Cuerpo con cuadro
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);

    doc.text('Nombre del Cliente:', 15, 50);
    doc.text(formData.cliente || 'N/A', 80, 50);

    doc.text('Monto:', 15, 60);
    const montoFormateado = `S/ ${(formData.monto || 0).toFixed(2)}`; 
    doc.text(montoFormateado, 80, 60);

    doc.text('Descripción:', 15, 70);
    doc.text(formData.descripcion || 'Sin descripción', 15, 80, { maxWidth: 180 });

    // Cuadro decorativo
    doc.rect(10, 40, 190, 50);

    // Línea inferior
    doc.line(10, 100, 200, 100);

    // Pie de página
    doc.setFontSize(10);
    doc.text('Gracias por elegir Fruton. Estamos para servirle.', 105, 110, { align: 'center' });

    doc.save('nota-de-credito.pdf');
  
    // Cerrar el modal manipulando el DOM
    const modal = document.getElementById('notaCreditoModal');
    if (modal) {
      modal.style.display = 'none';
    }

    // Limpiar el formulario
    this.notaCreditoForm.reset();

  }


  abrirModalNota() {
    const modal = document.getElementById('notaCreditoModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  cerrarModalNota() {
    const modal = document.getElementById('notaCreditoModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }


  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
    this.obtenerVentas();
    
  }

  metodoPago : string = "Efectivo";
  inputsDeshabilitados: boolean = false; // Para controlar el estado de los inputs

seleccionarMetodoPago(metodo: string): void {
  // Mensaje de confirmación o registro del método seleccionado
  console.log(`Método de pago seleccionado: ${this.metodoPago=metodo}`);

  // Deshabilitar los inputs
  this.inputsDeshabilitados = true;

  // Habilitar el botón de "Registrar Venta"
  this.isVentaRegistrable = true;
}

  sumT(valor:number){
    this.total += valor;
  }

  abrirModal() {   
     if(this.listaPedidos.length!=0){
    this.isVisible.elemento2 = true;
    this.brillo = 0.6;    
    }
    else{
      this.mostrarError("Ningun producto añadido", "Acción inválida");
    }

  }

  closeModal(){
    this.brillo=1;
    this.isVisible.elemento2=false;
  }

  calcularVuelto(montoEntregado: string) {
    const monto = parseFloat(montoEntregado);
    if (monto >= this.total) {
      this.vuelto = monto - this.total;
      this.isVentaRegistrable = true; // Habilita el botón si el monto es suficiente
    } else {
      alert('El monto entregado es insuficiente');
      this.vuelto = 0;
      this.isVentaRegistrable = false; // Deshabilita el botón si el monto es insuficiente
    }
  }

  verificarMonto(montoEntregado: string) {
    // Convierte el monto entregado a un número y verifica la condición
    const monto = parseFloat(montoEntregado);
    this.isVentaRegistrable = monto >= this.total; // Solo habilita si el monto es suficiente
  }

  obtenerProductos() {
    this._productosService.getProductos().subscribe(data => {
      console.log(data);
      this.productos = data.filter((producto:any) => (producto as{estado:boolean}).estado == true);
    }, error => {
      console.log(error);
    });
  }

  obtenerPedido(nombreProducto:any){


    var salir = false;
    
    this.listaPedidos.forEach((producto, index) => {
      if (producto.nombre === nombreProducto) {
        if(this.listaPedidos[index].cantidad+1>producto.stock){
          this.mostrarError("Stock insufieciente", "Fuera de stock");
          salir=true;
        }else{
          this.listaPedidos[index].cantidad += 1;
          this.sumT(producto.precio);
          salir = true;
      }}
    })

    
    this.verifica();
    if(salir) return;

    
    this.productos.forEach((producto: any) => {
        if (producto.nombre === nombreProducto) {
          producto.cantidad = 1;
          this.sumT(producto.precio); 
          this.listaPedidos.push(producto);
          this.verifica();
        }
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
      this.productos = data.filter((producto:any) => (producto as{categoria:string, estado:boolean}).categoria == categoria && producto.estado==true);
    
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

      this.mostrarBoleta(nuevaVenta.nombreCliente, 20)

      if(this.editingVentaIndex === null){

      this._ventasService.addVenta(nuevaVenta).subscribe(
        data => {
          console.log(data);
          this.listVentas.push(data);

          
      this.actualizarStock(this.listaPedidos.map(p=> p._id), this.listaPedidos.map(p=>(p.stock - p.cantidad)))
      this.mostrarSatisfaccion("Venta realizada con éxito", "Venta registrada");
      this.listaPedidos=[];
      this.total=0;
      this.inputsDeshabilitados = false;
      this.isVentaRegistrable = false;

      this.closeModal();
      this.isVisible.elemento1=true;
        },
        error => {
          console.error('Error', error);
          this.mostrarError("Ningun producto añadido", "Accion inválida");
        }
      );
    }else{

      this._ventasService.editarVenta(this.id,nuevaVenta).subscribe(
        data => {
          console.log(data);
          this.obtenerVentas();
          this.mostrarCambioVenta = false;
          this.botonContinuarDeshabilitado = true;
          this.nombreCliente = "";
          this.id = 0;
          this.editingVentaIndex=null;

      this.mostrarSatisfaccion("Venta editada con éxito", "Venta editada");
      this.listaPedidos=[];
      this.total=0;
      this.inputsDeshabilitados = false;
      this.isVentaRegistrable = false;
    

      this.closeModal();
      this.isVisible.elemento1=true;
        },
        error => {
          console.error('Error', error);
          this.mostrarError("Ningun producto añadido", "Accion inválida");
        }
      );
    }

  }



  actualizarStock(ids :(string|undefined) [],  stocks:number[]){
    this._productosService.actualizarStock(ids, stocks).subscribe(data=>{},
    error=>{
    console.log(error);
  })
}

  mostrarSatisfaccion(mensaje:string, Titulo:string) {
    this.toastr.success(mensaje, Titulo,
      {positionClass : "toast-top-right",}
   );
  }

  mostrarError(mensaje:string, Titulo:string) {
    this.toastr.error(mensaje, Titulo,
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

  mostrarBoleta(nombreCliente: string, montoEntregado: number) {
    const pdf = new jsPDF();
  
    // Encabezado con fondo
    pdf.setFillColor(0, 123, 255); // Azul
    pdf.rect(0, 0, 210, 30, 'F'); // Fondo completo
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 255, 255); // Texto blanco
    pdf.setFontSize(18);
    pdf.text('Fruton', 105, 15, { align: 'center' });
  
    pdf.setFontSize(12);
    pdf.text('Boleta de Venta', 105, 25, { align: 'center' });
  
    // Fecha y Cliente
    const fechaVenta = new Date().toLocaleString();
    pdf.setTextColor(0, 0, 0); // Texto negro
    pdf.setFontSize(10);
    pdf.text(`Fecha: ${fechaVenta}`, 10, 40);
    pdf.text(`Cliente: ${nombreCliente}`, 10, 45);
  
    // Línea separadora
    pdf.setDrawColor(0);
    pdf.line(10, 50, 200, 50); // Línea horizontal
  
    // Tabla de productos - Títulos
    let startY = 55;
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Producto', 10, startY);
    pdf.text('Precio (S/.)', 80, startY, { align: 'right' });
    pdf.text('Cantidad', 120, startY, { align: 'right' });
    pdf.text('Subtotal (S/.)', 160, startY, { align: 'right' });
    pdf.text('IGV (S/.)', 180, startY, { align: 'right' });
  
    // Cuerpo de la tabla
    pdf.setFont('helvetica', 'normal');
    let totalSinIgv = 0; // Acumulador de total sin IGV
    this.listaPedidos.forEach((producto) => {
      const subtotal = producto.precio * producto.cantidad;
      const igvProducto = subtotal * 0.18; // Calculamos el IGV por producto
      const subtotalConIgv = subtotal + igvProducto;
  
      startY += 7;
      pdf.text(producto.nombre, 10, startY);
      pdf.text(producto.precio.toFixed(2), 80, startY, { align: 'right' });
      pdf.text(producto.cantidad.toString(), 120, startY, { align: 'right' });
      pdf.text(subtotal.toFixed(2), 160, startY, { align: 'right' });
      pdf.text(igvProducto.toFixed(2), 180, startY, { align: 'right' });
  
      totalSinIgv += subtotal; // Acumulamos el total sin IGV
    });
  
    // Línea separadora antes del total
    startY += 10;
    pdf.line(10, startY, 200, startY);
  
    // Cálculo del IGV total
    const igvTotal = totalSinIgv * 0.18;
    const totalConIgv = totalSinIgv + igvTotal;
  
    // Información del total
    startY += 10;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text(`Total (sin IGV): S/. ${totalSinIgv.toFixed(2)}`, 10, startY);
    startY += 7;
    pdf.text(`IGV (18%): S/. ${igvTotal.toFixed(2)}`, 10, startY);
    startY += 7;
    pdf.text(`Total con IGV: S/. ${totalConIgv.toFixed(2)}`, 10, startY);
  
    // Método de Pago y Vuelto
    startY += 14;
    pdf.text(`Método de Pago: ${this.metodoPago}`, 10, startY);
    pdf.text(`Vuelto: S/. ${this.vuelto.toFixed(2)}`, 10, startY + 7);
  
    // Pie de página
    pdf.setFillColor(0, 123, 255);
    pdf.rect(0, 280, 210, 10, 'F'); // Fondo en el pie
    pdf.setFontSize(10);
    pdf.setTextColor(255, 255, 255);
    pdf.text('Gracias por su compra en Fruton', 105, 285, { align: 'center' });
  
    // Descargar PDF
    pdf.save(`Boleta_${nombreCliente}_${fechaVenta}.pdf`);
  }
  


  id:number|undefined = undefined;
  editingVentaIndex: number | null = null; 
  mostrarCambioVenta: boolean = false;
  botonContinuarDeshabilitado: boolean = true
  nombreCliente: string="";

seleccionarVentaParaEditar(index: number, _id:number|undefined, cliente:string) {
  this.id = _id;
  this.editingVentaIndex = index;  
  this.mostrarCambioVenta = true;
  this.botonContinuarDeshabilitado = false;
  this.nombreCliente = cliente;
  const venta = this.listVentas[index]; 

  this.listaPedidos = venta.productos.map((producto, i) => ({
    ...producto,
    cantidad: venta.cantidades[i]
    
  }));
  console.log(this.listaPedidos);
  this.total = venta.precioTotal;

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
