import { HistoriaClinicaService } from '../../../services/historia-clinica/historia-clinica.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoriaClinica } from 'src/app/models/historiaClinica';
import { SweetAlertsService } from 'src/app/services/sweet-alerts.service';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class ListarHistoriaClinicaComponent implements OnInit {
  historiasClinicas!:HistoriaClinica[];

  constructor(
    private router:Router,
    private historiaClinicaService:HistoriaClinicaService,
    private sweetAlert:SweetAlertsService
    ) { }

  ngOnInit(): void {
    this.obtenerTodasLasHistoriasClinicas();
  }

  private obtenerTodasLasHistoriasClinicas(){
    this.historiaClinicaService.obtener().subscribe(historiaClinica =>{
      this.historiasClinicas = historiaClinica;
    })
  }

  eliminarHistoriaClinica(id:number){

    this.sweetAlert.sweetAlertEliminar().then( (resp) => {

      if(resp.value){

        this.historiaClinicaService.eliminar(id).subscribe(() => this.obtenerTodasLasHistoriasClinicas() )
      }
    })
  }

  editar(id:number){
    this.router.navigate(['/historia-clinica', id])
  }
}