    export class Producto {
        _id?:string;
        nombre: string;
        descripcion:string;
        categoria: string;
        precio:number;
        stock:number;
        imagen:string;
        estado:boolean;

        constructor(nombre:string, descripcion:string, categoria:string, precio:number, stock:number, imagen:string, estado:boolean){
            this.nombre= nombre;
            this.descripcion=descripcion;
            this.categoria=categoria;
            this.precio=precio;
            this.stock=stock;
            this.imagen=imagen;
            this.estado=estado;
        }
    }