import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  url = 'http://localhost:4000/api/ventas'; //'https://solid-enigma-49995v4wrrph7vx7-4000.app.github.dev/api/ventas' o 'http://localhost:4000/api/ventas'

  constructor(private http: HttpClient) { }

  getVentas(): Observable<any> {
        return this.http.get<any>(this.url);
  }
  addVenta(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(`${this.url}/registrar`, venta);
  }

  editarVenta(id:number|undefined,venta:Venta):Observable<any>{
    return this.http.put(`${this.url}/${id}`, venta);
  }

}
