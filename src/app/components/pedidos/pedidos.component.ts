import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReporteService } from 'src/app/services/reporte.service';
import { Reportes } from 'src/app/models/reportes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit{

  listPedidos: Pedido[] = [];
  reporteForm: FormGroup;

  //Atributos temporales
  nPedido:number=0;
  cliente:string="";
  fechaPedido?:Date|undefined;


  constructor(private pedidoService: PedidoService, private fb: FormBuilder,
              private _reporteServices: ReporteService,private modalService: NgbModal,
              private toastr: ToastrService,
  ) {
    this.reporteForm = this.fb.group({
      desReporte: ['', Validators.required],
      tipoReporte:  ['', Validators.required]
    });
    
  }

  ngOnInit() {
    this.obtenerPedidos();
  }

  obtenerPedidos() {
    this.pedidoService.obtenerPedidos().subscribe(
      (pedidos) => {
        this.listPedidos = pedidos;
      },
      (error) => {
        console.error('Error al obtener los pedidos:', error);
      }
    );
  }

  actualizarEstado(id: number, estado: string): void {
    this.pedidoService.actualizarEstado(id, estado).subscribe(
        (respuesta) => {
            console.log('Respuesta del servidor:', respuesta); 
            const index = this.listPedidos.findIndex(p => p._id === id);
            if (index !== -1) {
                // Actualiza solo el estado en el pedido actual
                this.listPedidos[index].estado = respuesta.estado; 
                console.log('Estado actualizado:', this.listPedidos[index]); // Verifica el estado actualizado
            }
        },
        (error) => {
            console.error('Error al actualizar el estado:', error);
        }
    );
  }

  obtenerDatos(fecha:Date |undefined, npedido:number, cliente:string){
    this.fechaPedido=fecha;
    this.nPedido=npedido;
    this.cliente=cliente;
  }

  crearReporte() {

    if (this.reporteForm.valid) {

      const descripcion = this.reporteForm.get('desReporte')?.value;
      const tipo = this.reporteForm.get('tipoReporte')?.value;

      const nuevoReporte: Reportes = {
        cliente:this.cliente,
        nPedido:this.nPedido,
        fechaPedido:this.fechaPedido!,
        descripcion:descripcion,
        tipo:tipo
      };

      this._reporteServices.guardarReporte(nuevoReporte).subscribe(
        data => {
          this.reporteForm.reset(); // Reiniciar el formulario
        },
        error => {
          console.error('Error al crear reporte:', error);
        }
      );
      this.modalService.dismissAll();
      this.mostrarCheck("reclamo registrado", "Reporte creado");
    } else {
      console.log('Formulario inválido');
    }
  }


  cambiarEstado(pedido: Pedido): void {
    const estados = ['Pendiente', 'En Proceso', 'Completado', 'Cancelado'];
    const currentIndex = estados.indexOf(pedido.estado);

    // Si el estado actual es "Cancelado", no cambiar el estado
    if (pedido.estado === 'Cancelado') return;

    // Calcula el siguiente estado
    const nextIndex = currentIndex + 1;
    pedido.estado = estados[nextIndex];

    // Llama a actualizarEstado para enviar el cambio al backend
    this.actualizarEstado(pedido._id, pedido.estado);
  }

  mostrarCheck(mensaje:string, Titulo:string) {
    this.toastr.success(mensaje, Titulo,
      {positionClass : "toast-top-right",}
   );
  }
}
