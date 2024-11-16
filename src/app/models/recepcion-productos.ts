export class RecepcionProductos {
    _id?: number;
    nombre: string;
    descripcion: string;
    categoria: string;
    estado: string;
    precio: number;

    constructor(nombre: string,descripcion:string,categoria: string,estado: string,precio: number) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.estado = estado;
        this.precio = precio;
    }
}