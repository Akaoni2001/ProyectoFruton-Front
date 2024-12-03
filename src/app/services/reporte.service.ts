import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reportes } from '../models/reportes';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  url = 'http://localhost:4000/api/reportes'//'https://organic-space-halibut-6777q564w55hrj4v-4000.app.github.dev/api/reportes'; //'https://solid-enigma-49995v4wrrph7vx7-4000.app.github.dev/api/categorias' o 'http://localhost:4000/api/categorias'

  constructor(private http:HttpClient) { }
  

  getReporte(): Observable<any>{
    return this.http.get(this.url);
  }
  guardarReporte(reporte: Reportes):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.url}/registrar`, reporte, { headers: headers });
  }
}