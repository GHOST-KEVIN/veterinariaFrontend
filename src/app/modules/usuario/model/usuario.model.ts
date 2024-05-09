import { Mascota } from "../../mascota/model/mascota.model"

export class Usuario {
    
      id !: number
      nombres !: string
      apellidos !: string
      tipoDocumento !: string
      documentoIdentificacion !: number
      estado !: string
      sexo !: string
      mascotas !: Mascota[]
}