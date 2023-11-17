import { HistoriaClinicaService } from '../../../services/historia-clinica/historia-clinica.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Detalles } from 'src/app/models/detalles';
import { HistoriaClinica } from 'src/app/models/historiaClinica';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {
  historiasClinicas!:HistoriaClinica[];

  constructor(private router:Router, private historiaClinicaService:HistoriaClinicaService) { }

  ngOnInit(): void {
    this.obtenerTodasLasHistoriasClinicas();
  }

  private obtenerTodasLasHistoriasClinicas(){
    this.historiaClinicaService.obtener().subscribe(historiaClinica =>{
      this.historiasClinicas = historiaClinica;
    })
  }

  eliminarHistoriaClinica(id:number){
    this.historiaClinicaService.eliminar(id).subscribe(() => {
      this.obtenerTodasLasHistoriasClinicas();
    })
  }

  editar(id:number){
    this.router.navigate(['editar-historia-clinica', id])
  }

}
