import { Mascota } from "./mascota";

export class HistoriaClinica{
    id!:number;
    fechaCreacion!:Date;
    mascota:Mascota = new Mascota()
}