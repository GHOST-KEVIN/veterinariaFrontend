import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpCliente:HttpClient) { }

  obtener():Observable<Usuario[]>{
    return this.httpCliente.get<Usuario[]>("http://localhost:8084/api/usuario")
  }

  obtenerPorId(id:number){
    return this.httpCliente.get<Usuario>("http://localhost:8084/api/usuario/" + id)
  }

  registrar(dataUsuario:Usuario){
    return this.httpCliente.post("http://localhost:8084/api/usuario", dataUsuario)
  }

  actualizar(id:number, dataUsuario:Usuario){
    return this.httpCliente.put("http://localhost:8084/api/usuario/" + id, dataUsuario)
  }

  eliminar(id:number){
    return this.httpCliente.delete("http://localhost:8084/api/usuario/" + id)
  }
}
