import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url = 'https://organic-space-halibut-6777q564w55hrj4v-4000.app.github.dev/api/categorias'; //'https://solid-enigma-49995v4wrrph7vx7-4000.app.github.dev/api/categorias' o 'http://localhost:4000/api/categorias'

  constructor(private http:HttpClient) { }
  
  
  getCategorias(): Observable<any>{
    return this.http.get(this.url);
  }

  eliminarCategoria(id:string):Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }

  guardarCategoria(categoria: Categoria):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.url}/registrar`, categoria, { headers: headers });
  }

  obtenerCategoria(id:string):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  editarCategoria(id:string,categoria:Categoria):Observable<any>{
    return this.http.put(`${this.url}/${id}`, categoria);
  }
}
