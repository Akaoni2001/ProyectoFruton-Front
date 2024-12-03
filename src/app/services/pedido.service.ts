import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  url = 'https://organic-space-halibut-6777q564w55hrj4v-4000.app.github.dev/api/pedidos'; 

    constructor(private http: HttpClient) { }

    obtenerPedidos(): Observable<Pedido[]> {
        return this.http.get<Pedido[]>(this.url);
    }

    addPedido(pedido: Pedido): Observable<Pedido> {
        return this.http.post<Pedido>(`${this.url}/registrar`, pedido);
    }

    actualizarEstado(id: number, estado: string): Observable<Pedido> {
      return this.http.put<Pedido>(`${this.url}/${id}/estado`, { estado });
    }
}
