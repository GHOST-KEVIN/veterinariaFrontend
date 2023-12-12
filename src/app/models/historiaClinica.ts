import { Detalles } from "./detalles";
import { Mascota } from "./mascota";

export class HistoriaClinica{
    id!:number;
    fechaCreacion!:Date;
    mascotaId!:number;
    mascota:Mascota = new Mascota()
    detallesClinicos !: Detalles[]
}