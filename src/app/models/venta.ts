import { Producto } from "./producto";

export class Venta{
    _id?:number;
    nombreCliente: string;
    productos:Producto[];
    cantidades: number[];
    precioTotal:number;
    fechaVenta:Date;

    constructor(nombreCliente:string, productos:Producto[], cantidades:number[], precioTotal:number,fechaVenta:Date){
        this.nombreCliente = nombreCliente;
        this.productos=productos;
        this.cantidades=cantidades;
        this.precioTotal=precioTotal;
        this.fechaVenta=fechaVenta;
    }
}