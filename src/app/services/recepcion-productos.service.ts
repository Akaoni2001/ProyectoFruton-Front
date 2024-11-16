import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecepcionProductos } from '../models/recepcion-productos';

@Injectable({
  providedIn: 'root'
})
export class RecepcionProductosService {

  url='http://localhost:4000/api/recepcion-productos';

  constructor(private http: HttpClient) { }

  getRecepcionProductos(): Observable<any>{
    return this.http.get(this.url);
  }

  eliminarRecepcionProducto(id:string):Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }

  guardarRecepcionProducto(recepcionproductos: RecepcionProductos):Observable<any>{
    return this.http.post(this.url, recepcionproductos);
  }

  obtenerRecepcionProducto(id:string):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  editarRecepcionProducto(id:string,recepcionproductos:RecepcionProductos):Observable<any>{
    return this.http.put(`${this.url}/${id}`, recepcionproductos);
  }
}
