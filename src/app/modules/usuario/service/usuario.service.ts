import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/env/environment';
import { Usuario } from '../model/usuario.model';
import { Mascota } from '../../mascota/model/mascota.model';

@Injectable()
export class UsuarioService {

  constructor(private http : HttpClient) { }

  obtener():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${environment.api}usuario/listar`)
  }

  obtenerPorId(id:number): Observable<Usuario>{
    return this.http.get<Usuario>(`${environment.api}usuario/buscar-por-id/${id}`)
  }

  registrar(dataUsuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(`${environment.api}usuario/crear`, dataUsuario)
  }

  actualizar(dataUsuario:Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(`${environment.api}usuario/actualizar/${dataUsuario.id}`, dataUsuario)
  }

  actualizarMascotaDelUsuario(mascota:Mascota){
    return this.http.put<Mascota>(`${environment.api}mascota/actualizar/${mascota.id}`, mascota)
  }

  eliminar(id:number){
    return this.http.delete(`${environment.api}usuario/eliminar/${id}`)
  }
}
