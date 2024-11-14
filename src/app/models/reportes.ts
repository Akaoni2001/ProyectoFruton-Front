import { Producto } from "./producto";
import { Pedido } from "./pedido";

export class Reportes{
    _id: number; 
    nombreCliente: string;
    pedido:Pedido[]; 
    descripcionReclamo: string;
    tipoReclamo: string;
    fechaReclamo: Date; 

    constructor(_id: number, nombreCliente: string, pedidos: Pedido[], descripcion: string, tipoReclamo: string, fechaReclamo: Date) {
        this._id = _id; 
        this.nombreCliente = nombreCliente;
        this.pedido = pedidos;
        this.descripcionReclamo = descripcion;
        this.tipoReclamo = tipoReclamo;
        this.fechaReclamo = fechaReclamo;
    }
}