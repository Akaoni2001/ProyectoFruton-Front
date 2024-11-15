export class Rol{
    _id?:number;
    nombreRol: string;
    fechaCreacion:Date;

    constructor(nombreRol: string,fechaCreacion:Date){
        this.nombreRol=nombreRol;
        this.fechaCreacion=fechaCreacion;
    }
}