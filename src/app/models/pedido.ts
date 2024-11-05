import { Producto } from "./producto";

export class Pedido {
    _id: number; 
    nombreCliente: string;
    productos:Producto[]; 
    cantidades: number[];
    estado: string; 

    constructor(_id: number, nombreCliente: string, productos: Producto[], cantidades: number[], estado: string = '') {
        this._id = _id; 
        this.nombreCliente = nombreCliente;
        this.productos = productos;
        this.cantidades = cantidades;
        this.estado = estado;
    }
}