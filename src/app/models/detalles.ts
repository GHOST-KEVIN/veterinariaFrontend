import { HistoriaClinica } from 'src/app/models/historiaClinica';
import { Colaborador } from './colaborador';
export class Detalles{
    id!: number
    temperatura!: string
    peso!: number
    frecuenciaCardiaca!: number
    frecuenciaRespiratoria!:number
    fechaHora!:Date
    alimentacion!:string
    habitad!:string
    observacion!:string
    historiaClinicaId!:number
    historiaClinica:HistoriaClinica = new HistoriaClinica();
    colaboradorId!:number
    colaborador:Colaborador = new Colaborador();
}