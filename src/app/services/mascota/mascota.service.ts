import { Mascota } from './../../models/mascota';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/env/environment';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  constructor(private httpClient:HttpClient) { }

  obtener():Observable<Mascota[]>{
    return this.httpClient.get<Mascota[]>(`${environment.api}mascota/listar`)
  }

  obtenerPorId(id:number):Observable<Mascota>{
    return this.httpClient.get<Mascota>(`${environment.api}mascota/buscarPorId/${id}`)
  }

  guardar(data:Mascota){
    return this.httpClient.post(`${environment.api}mascota/crear`, data)
  }

  actualizar(id:number, data:Mascota){
    return this.httpClient.put(`${environment.api}mascota/actualizar/${id}`, data)
  }

  eliminar(id:number){
    return this.httpClient.delete(`${environment.api}mascota/eliminar/${id}`)
  }
}
