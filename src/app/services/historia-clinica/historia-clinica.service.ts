import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HistoriaClinica } from 'src/app/models/historiaClinica';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {

  constructor(private httpClient:HttpClient){}

  obtener():Observable<HistoriaClinica[]>{
    return this.httpClient.get<HistoriaClinica[]>("http://localhost:8084/api/historia_clinica");
  }

  obtenerPorId(id:number){
    return this.httpClient.get<HistoriaClinica>("http://localhost:8084/api/historia_clinica/" + id);
  }

  guardar(historiaClinica:HistoriaClinica){
    return this.httpClient.post("http://localhost:8084/api/historia_clinica", historiaClinica);
  }

  actualizar(id:number, historiaClinica:HistoriaClinica){
    return this.httpClient.put("http://localhost:8084/api/historia_clinica/" + id, historiaClinica);
  }

  eliminar(id:number){
    return this.httpClient.delete("http://localhost:8084/api/historia_clinica/" + id);
  }
  
}
