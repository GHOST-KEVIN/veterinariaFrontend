import { Usuario } from "../../usuario/model/usuario.model";

export class Mascota{
    id !: number;
    nombre !: string;
    raza !: string;
    sexo !: string;
    usuarioId !: number;
    usuario ?: Usuario;
}