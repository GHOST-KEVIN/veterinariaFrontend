import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Colaborador } from 'src/app/models/colaborador';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  constructor(private http:HttpClient) { }

  obtener():Observable<Colaborador[]>{
    return this.http.get<Colaborador[]>("http://localhost:8084/api/colaborador")
  }

  obtenerPorId(id:number):Observable<Colaborador>{
    return this.http.get<Colaborador>("http://localhost:8084/api/colaborador/" + id)
  }

  guardar(data:Colaborador){
    return this.http.post("http://localhost:8084/api/colaborador", data)
  }

  actualizar(id:number, data:Colaborador){
    return this.http.put("http://localhost:8084/api/colaborador/" + id, data)
  }

  eliminar(id:number){
    return this.http.delete("http://localhost:8084/api/colaborador/" + id)
  }
}
