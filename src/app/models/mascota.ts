import { Usuario } from "./usuario";

export class Mascota{
    id!:number;
    nombre!:string;
    raza?:string;
    sexo?:string;
    usuario:Usuario = new Usuario()
}