import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:4000/api/users'; //'https://solid-enigma-49995v4wrrph7vx7-4000.app.github.dev/api/users' o 'http://localhost:4000/api/users'


  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.url}/login`, user, { headers });
  }

  getUsers(): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(`${this.url}/usuarios`, { headers});
  }
  delete_user(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(`${this.url}/usuario/eliminar/${id}`, { headers });
  }
  registrar(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.url}/registrar`, data, { headers: headers });
  }
}
