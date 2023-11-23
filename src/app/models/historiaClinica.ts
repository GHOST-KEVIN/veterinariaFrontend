import { Mascota } from "./mascota";

export class HistoriaClinica{
    id!:number;
    fechaCreacion!:Date;
    mascotaId!:number;
    mascota:Mascota = new Mascota()
}