import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mascota } from '../model/mascota.model';
import { environment } from 'src/app/env/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../../usuario/model/usuario.model';

@Injectable()
export class MascotaService {

  constructor(private http:HttpClient) { }

  obtener():Observable<Mascota[]>{
    return this.http.get<Mascota[]>(`${environment.api}mascota/listar`)
  }

  // obtenerPorId(id:number):Observable<Mascota>{
  //   return this.http.get<Mascota>(`${environment.api}mascota/buscar-por-id/${id}`)
  // }

  obtenerUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${environment.api}usuario/listar`)
  }

  obtenerUsuarioPorid(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(`${environment.api}usuario/buscar-por-id/${id}`)
  }

  registrar(dataMascota:Mascota):Observable<Mascota>{
    return this.http.post<Mascota>(`${environment.api}mascota/crear`, dataMascota)
  }

  actualizar(dataMascota:Mascota):Observable<Mascota>{
    return this.http.put<Mascota>(`${environment.api}mascota/actualizar/${dataMascota.id}`, dataMascota)
  }

  eliminar(id:number){
    return this.http.delete(`${environment.api}mascota/eliminar/${id}`)
  }
}
