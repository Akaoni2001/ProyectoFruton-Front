export class User{
    _id?:number;
    nombres: string;
    apellidos: string;
    email:string;
    password:string;
    role: string;

    constructor(nombres:string,apellidos:string,email:string, password:string,role:string){
        this.nombres=nombres;
        this.apellidos=apellidos;
        this.email=email;
        this.password=password;
        this.role=role;
    }
}