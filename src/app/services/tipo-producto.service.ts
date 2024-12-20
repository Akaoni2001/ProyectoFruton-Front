import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoProducto } from '../models/tipo-producto';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {
  
  url='https://organic-space-halibut-6777q564w55hrj4v-4000.app.github.dev/api/tipo-producto';

  constructor(private http: HttpClient) { }

  getTipoProductos(): Observable<any>{
    return this.http.get(this.url);
  }

  eliminarTipoProducto(id:string):Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }

  guardarTipoProducto(tipoproducto: TipoProducto):Observable<any>{
    return this.http.post(this.url, tipoproducto);
  }

  obtenerTipoProducto(id:string):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  editarTipoProducto(id:string,tipoproducto:TipoProducto):Observable<any>{
    return this.http.put(`${this.url}/${id}`, tipoproducto);
  }
}