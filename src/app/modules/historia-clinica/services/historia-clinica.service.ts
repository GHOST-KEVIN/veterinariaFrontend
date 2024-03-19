import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoriaClinica } from '../model/historia-clinica.model';
import { environment } from 'src/app/env/environment';
import { Mascota } from '../../mascota/model/mascota.model';

@Injectable()
export class HistoriaClinicaService {

  constructor(private http:HttpClient){}

  obtener():Observable<HistoriaClinica[]>{
    return this.http.get<HistoriaClinica[]>(`${environment.api}historia-clinica/listar`);
  }

  obtenerPorId(id:number):Observable<HistoriaClinica>{
    return this.http.get<HistoriaClinica>(`${environment.api}historia-clinica/buscar-por-id/${id}`);
  }

  obtenerMascotas():Observable<Mascota[]>{
    return this.http.get<Mascota[]>(`${environment.api}mascota/listar`)
  }

  registrar(historiaClinica:HistoriaClinica):Observable<HistoriaClinica>{
    return this.http.post<HistoriaClinica>(`${environment.api}historia-clinica/crear`, historiaClinica);
  }

  actualizar(historiaClinica:HistoriaClinica):Observable<HistoriaClinica>{
    return this.http.put<HistoriaClinica>(`${environment.api}historia-clinica/actualizar/${historiaClinica.id}`, historiaClinica);
  }

  eliminar(id:number){
    return this.http.delete(`${environment.api}historia-clinica/${id}`);
  }
}
