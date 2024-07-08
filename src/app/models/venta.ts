import { Producto } from "./producto";

export class Venta{
    _id?:number;
    nombreCliente: string;
    producto:Producto;
    cantidad: number;
    precioProducto:number;
    fechaVenta:Date;

    constructor(nombreCliente:string, producto:Producto, cantidad:number, precioProducto:number,fechaVenta:Date){
        this.nombreCliente= nombreCliente;
        this.producto=producto;
        this.cantidad=cantidad;
        this.precioProducto=precioProducto;
        this.fechaVenta=fechaVenta;
    }
}