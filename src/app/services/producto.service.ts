import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url='http://localhost:4000/api/productos'; //'https://solid-enigma-49995v4wrrph7vx7-4000.app.github.dev/api/productos' o 'http://localhost:4000/api/productos'

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Usa el TokenService si ya lo implementaste
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
  }

  getProductos(): Observable<any> {
    return this.http.get(this.url, { headers: this.getAuthHeaders() });
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.getAuthHeaders() });
  }

  guardarProducto(producto: Producto): Observable<any> {
    return this.http.post(this.url, producto, { headers: this.getAuthHeaders() });
  }

  obtenerProducto(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`, { headers: this.getAuthHeaders() });
  }

  editarProducto(id: string, producto: Producto): Observable<any> {
    return this.http.put(`${this.url}/editar-producto/${id}`, producto, { headers: this.getAuthHeaders() });
  }
  
  actualizarEstado(id: string | undefined, estado: Boolean): Observable<any> {
    return this.http.put(`${this.url}/${id}`, { estado }, { headers: this.getAuthHeaders() });
  }

  actualizarStock(ids: (string | undefined)[], stocks: number[]): Observable<any> {
    const body = ids.map((id, index) => ({  
      id: id,
      stock: stocks[index]
    }));
    return this.http.put(`${this.url}`, body, { headers: this.getAuthHeaders() });
  }

  
}
