export class Producto {
    _id?:number;
    nombre: string;
    descripcion:string;
    categoria: string;
    precio:number;
    stock:number;
    imagen?:string;

    constructor(nombre:string, descripcion:string, categoria:string, precio:number, stock:number, imagen:string){
        this.nombre= nombre;
        this.descripcion=descripcion;
        this.categoria=categoria;
        this.precio=precio;
        this.stock=stock;
        this.imagen=imagen;
    }
}