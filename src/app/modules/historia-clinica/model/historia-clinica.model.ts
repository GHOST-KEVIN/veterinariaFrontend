import { Mascota } from "../../mascota/model/mascota.model";

export class HistoriaClinica{
    id!:number;
    fechaCreacion!:Date;
    mascotaId!:number;
    mascota!:Mascota
    // detallesClinicos !: Detalles[]
}