import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { ReporteService } from 'src/app/services/reporte.service';
import { Reportes } from 'src/app/models/reportes';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {

  listReportes:Reportes[]=[];
  constructor(
    private _reporteServices: ReporteService){}

  ngOnInit():void{
this.obtenerReportes();
  }
  
  obtenerReportes() {
    this._reporteServices.getReporte().subscribe(
      data => {
        console.log(data);
        this.listReportes = data;
      },
      error => {
        console.log(error);
      }
    );
  }



}
