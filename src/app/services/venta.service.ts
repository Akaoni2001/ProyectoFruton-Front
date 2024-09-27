import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  url = 'http://localhost:4000/api/ventas'

  constructor(private http: HttpClient) { }

  getVentas(): Observable<any> {
        return this.http.get<any>(this.url);
  }
  addVenta(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(`${this.url}/registrar`, venta);
  }
}
