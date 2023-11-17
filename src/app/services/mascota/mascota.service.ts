import { Mascota } from './../../models/mascota';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  constructor(private httpClient:HttpClient) { }

  obtener():Observable<Mascota[]>{
    return this.httpClient.get<Mascota[]>("http://localhost:8084/api/mascota")
  }

  obtenerPorId(id:number):Observable<Mascota>{
    return this.httpClient.get<Mascota>("http://localhost:8084/api/mascota/" + id)
  }

  guardar(data:Mascota){
    return this.httpClient.post("http://localhost:8084/api/mascota", data)
  }

  actualizar(id:number, data:Mascota){
    return this.httpClient.put("http://localhost:8084/api/mascota/" + id, data)
  }

  eliminar(id:number){
    return this.httpClient.delete("http://localhost:8084/api/mascota/" + id)
  }
}
