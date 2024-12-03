import { Component } from '@angular/core';
import { Venta } from 'src/app/models/venta';
import { VentaService } from 'src/app/services/venta.service';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { TipoProducto } from 'src/app/models/tipo-producto';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';
import { Chart } from 'chart.js/auto'; 


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent {
  ordenesDia:number=0; 
  listVentas: Venta[]=[]; 
  montoTotalVenta: number=0;
  listProductos: TipoProducto[]=[];
  meses: string[]=[];
  total: number[]=[];

  constructor(
    private _ventasService:VentaService
  ){}

  ngOnInit() {    
    this.obtenerVentas();
  }

  initializeChart() {
    const ctx = document.getElementById('monthlyChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.meses,
        datasets: [{
          label: 'Ingresos Mensuales',
          data: this.total,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
  });
  }

  getDataVenta(){

  }
  obtenerVentas(){
    this._ventasService.getVentas().subscribe(data => {
      console.log(data);
      this.listVentas = data;
      this.sumarVentasPorMes(),
      this.initializeChart();
    }, error => {
      console.log(error);
    });
  }

  sumarVentasPorMes(){
    const ventasPorMes: { [key: string]: number } = {};
  
    this.listVentas.forEach(venta => {
        const fecha = new Date(venta.fechaVenta);
        const mes =`${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}`;
    
        if (ventasPorMes[mes]) {
          ventasPorMes[mes] += venta.precioTotal;
        } else {
          ventasPorMes[mes] = venta.precioTotal;
        }
      });
    
      const meses = Object.keys(ventasPorMes).sort();
      const totales = meses.map(mes => ventasPorMes[mes]);
    
     this.meses=meses;
     this.total=totales;
     console.log(this.meses)
     console.log(this.total)
  }

}