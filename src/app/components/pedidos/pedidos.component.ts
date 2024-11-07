import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit{

  listPedidos: Pedido[] = [];
  

  constructor(private pedidoService: PedidoService, private fb: FormBuilder) {

    
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
}
