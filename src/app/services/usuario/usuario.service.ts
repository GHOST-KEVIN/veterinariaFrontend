import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/env/environment';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpCliente:HttpClient) { }

  obtener():Observable<Usuario[]>{
    return this.httpCliente.get<Usuario[]>(`${environment.api}usuario/listar`)
  }

  obtenerPorId(id:number): Observable<Usuario>{
    return this.httpCliente.get<Usuario>(`${environment.api}usuario/buscarPorId/${id}`)
  }

  registrar(dataUsuario:Usuario){
    return this.httpCliente.post(`${environment.api}usuario/crear`, dataUsuario)
  }

  actualizar(id:number, dataUsuario:Usuario){
    return this.httpCliente.put(`${environment.api}usuario/actualizar/${id}`, dataUsuario)
  }

  eliminar(id:number){
    return this.httpCliente.delete(`${environment.api}usuario/eliminar/${id}`)
  }
}
// https://www.tutorialesprogramacionya.com/angularya/index.php?inicio=80