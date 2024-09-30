export class Categoria{
    _id?:number;
    nombreCategoria: string;
    fechaCreacion:Date;

    constructor(nombreCategoria: string,fechaCreacion:Date){
        this.nombreCategoria=nombreCategoria;
        this.fechaCreacion=fechaCreacion;
    }
}