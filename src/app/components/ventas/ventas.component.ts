import { Component } from '@angular/core';
import { Venta } from 'src/app/models/venta';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {

  listVentas: Venta[]=[];
  

  constructor(private _ventasService: VentaService) { }

  ngOnInit(): void{
    this.obtenerVentas();
  }

  obtenerVentas(){
    this._ventasService.getVentas().subscribe(data=>{
      console.log(data);
      this.listVentas= data;
    }, error=>{
      console.log(error);
    })
  }
}
