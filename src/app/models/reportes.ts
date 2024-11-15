export class Reportes{
    _id?: number; 
    cliente: string;
    nPedido:number;
    fechaPedido:Date;
    descripcion: string;
    tipo: string;
    fechaReclamo?: Date

    constructor(cliente: string,nPedido:number, fechaPedido:Date, descripcion: string, tipo: string) {
        this.cliente = cliente;
        this.nPedido = nPedido;
        this.fechaPedido = fechaPedido;
        this.descripcion = descripcion;
        this.tipo = tipo;
    }
}