import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

<<<<<<< HEAD
  url='http://localhost:4000/api/productos'
=======
  url='http://localhost:4000/api/productos'; //'https://solid-enigma-49995v4wrrph7vx7-4000.app.github.dev/api/productos' o 'http://localhost:4000/api/productos'
>>>>>>> 120b4ed8493a7c7dd8a4a4aaab13ae68648a35ad

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any>{
    return this.http.get(this.url);
  }

  eliminarProducto(id:string):Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }

  guardarProducto(producto: Producto):Observable<any>{
    return this.http.post(this.url, producto);
  }

  obtenerProducto(id:string):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  editarProducto(id:string,producto:Producto):Observable<any>{
    return this.http.put(`${this.url}/${id}`, producto);
  }
}
