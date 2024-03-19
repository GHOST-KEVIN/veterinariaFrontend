// import { Colaborador } from './colaborador';

import { HistoriaClinica } from "../../historia-clinica/model/historia-clinica.model"

export class DetalleHistoriaClinica{
    id !: number
    temperatura !: string
    peso !: number
    frecuenciaCardiaca !: number
    frecuenciaRespiratoria !: number
    fechaHora !: Date
    alimentacion !: string
    habitad !: string
    observacion !: string
    historiaClinicaId !: number
    historiaClinica !: HistoriaClinica
    colaboradorId !: number
    // colaborador:Colaborador = new Colaborador();
}