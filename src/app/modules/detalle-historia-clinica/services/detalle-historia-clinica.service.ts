import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleHistoriaClinica } from '../model/detalle-historia-clinica.model';
import { environment } from 'src/app/env/environment';
import { HistoriaClinica } from '../../historia-clinica/model/historia-clinica.model';
import { Colaborador } from '../../colaborador/model/colaborador.model';

@Injectable()
export class DetalleHistoriaClinicaService {

  private url = `${environment.api}detalle-historia-clinica/`

  constructor(private http:HttpClient) { }

  obtener():Observable<DetalleHistoriaClinica[]>{
    return this.http.get<DetalleHistoriaClinica[]>(`${this.url}listar`)
  }

  obtenerHistoriasClinicas():Observable<HistoriaClinica[]>{
    return this.http.get<HistoriaClinica[]>(`${environment.api}historia-clinica/listar`)
  }

  obtenerColaboradores():Observable<Colaborador[]>{
    return this.http.get<Colaborador[]>(`${environment.api}colaborador/listar`)
  }

  obtenerPorId(id:number):Observable<DetalleHistoriaClinica>{
    return this.http.get<DetalleHistoriaClinica>(`${this.url}buscar-por-id/${id}`)
  }

  registrar(detalles:DetalleHistoriaClinica):Observable<DetalleHistoriaClinica>{
    return this.http.post<DetalleHistoriaClinica>(`${this.url}crear`, detalles)
  }

  actualizar(detalles:DetalleHistoriaClinica):Observable<DetalleHistoriaClinica>{
    return this.http.put<DetalleHistoriaClinica>(`${this.url}actualizar/${detalles.id}`, detalles)
  }

  eliminar(id:number){
    return this.http.delete(`${this.url}eliminar/${id}`)
  }
}
