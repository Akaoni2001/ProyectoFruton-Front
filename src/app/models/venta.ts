import { Producto } from "./producto";

export class Venta{
    _id?:number;
    productos:Producto[];
    cantidades: number[];
    precioTotal:number;
    fechaVenta:Date;

    constructor(productos:Producto[], cantidades:number[], precioTotal:number,fechaVenta:Date){
        this.productos=productos;
        this.cantidades=cantidades;
        this.precioTotal=precioTotal;
        this.fechaVenta=fechaVenta;
    }
}