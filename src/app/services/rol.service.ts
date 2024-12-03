import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  url = 'http://localhost:4000/api/roles'//'https://organic-space-halibut-6777q564w55hrj4v-4000.app.github.dev/api/roles'; //'https://solid-enigma-49995v4wrrph7vx7-4000.app.github.dev/api/categorias' o 'http://localhost:4000/api/categorias'

  constructor(private http:HttpClient) { }
  
  
  getRoles(): Observable<any>{
    return this.http.get(this.url);
  }

  eliminarRol(id:string):Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }

  guardarRol(rol: Rol):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.url}/registrar`, rol, { headers: headers });
  }

  obtenerRol(id:string):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  editarRol(id:string,rol:Rol):Observable<any>{
    return this.http.put(`${this.url}/${id}`, rol);
  }
}
