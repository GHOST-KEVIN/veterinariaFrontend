import { Usuario } from "./usuario";

export class Mascota{
    id!:number;
    nombre!:string;
    raza!:string;
    sexo!:string;
    usuarioId!:number;
    usuario:Usuario = new Usuario()
}