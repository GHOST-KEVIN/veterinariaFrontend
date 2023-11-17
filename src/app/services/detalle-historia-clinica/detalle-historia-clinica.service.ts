import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Detalles } from 'src/app/models/detalles';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleHistoriaClinicaService {
  
  constructor(private httpClient:HttpClient) { }

  obtener():Observable<Detalles[]>{
    return this.httpClient.get<Detalles[]>("http://localhost:8084/api/detalle_historia_clinica")
  }

  obtenerPorId(id:number):Observable<Detalles>{
    return this.httpClient.get<Detalles>("http://localhost:8084/api/detalle_historia_clinica/"+id)
  }

  guardar(detalles:Detalles){
    return this.httpClient.post("http://localhost:8084/api/detalle_historia_clinica",detalles)
  }

  actualizar(id:number, detalles:Detalles){
    return this.httpClient.put("http://localhost:8084/api/detalle_historia_clinica/"+id ,detalles)
  }

  eliminar(id:number){
    return this.httpClient.delete("http://localhost:8084/api/detalle_historia_clinica/" + id)
  }
}
