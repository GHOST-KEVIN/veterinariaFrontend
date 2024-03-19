import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Colaborador } from '../model/colaborador.model';
import { environment } from 'src/app/env/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ColaboradorService {

  constructor(private http:HttpClient) { }

  obtener():Observable<Colaborador[]>{
    return this.http.get<Colaborador[]>(`${environment.api}colaborador/listar`)
  }

  obtenerPorId(id:number): Observable<Colaborador>{
    return this.http.get<Colaborador>(`${environment.api}colaborador/buscar-por-id/${id}`)
  }

  registrar(dataColaborador:Colaborador):Observable<Colaborador>{
    return this.http.post<Colaborador>(`${environment.api}colaborador/crear`, dataColaborador)
  }

  actualizar(dataColaborador:Colaborador):Observable<Colaborador>{
    return this.http.put<Colaborador>(`${environment.api}colaborador/actualizar/${dataColaborador.id}`, dataColaborador)
  }

  eliminar(id:number){
    return this.http.delete(`${environment.api}colaborador/eliminar/${id}`)
  }
}
