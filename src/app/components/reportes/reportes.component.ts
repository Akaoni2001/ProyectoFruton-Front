import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  
  isVisible = {
    elemento1: true,
    elemento2: false
  };
  brillo: number=1;
  listaPedidos: any[] = [];

  constructor( ){}

  ngOnInit():void{

  }
  
  abrirModal() {    
   
  }

  closeModal(){
    this.brillo=1;
    this.isVisible.elemento2=false;
  }



}
