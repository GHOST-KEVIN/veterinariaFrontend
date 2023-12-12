import { Mascota } from "./mascota"

export class Usuario{
    id! : number
    nombre! : string
    apellido! : string
    tipoDocumento! : string
    documentoIdentificacion! : number
    estado! : boolean
    sexo! : string
    mascotas !: Mascota[]

}