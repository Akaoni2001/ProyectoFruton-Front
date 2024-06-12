export class Producto {
    _id?:number;
    nombre: string;
    descripcion:string;
    categoria: string;
    precio:number;
    stock:number;

    constructor(nombre:string, descripcion:string, categoria:string, precio:number, stock:number){
        this.nombre= nombre;
        this.descripcion=descripcion;
        this.categoria=categoria;
        this.precio=precio;
        this.stock=stock;
    }
}