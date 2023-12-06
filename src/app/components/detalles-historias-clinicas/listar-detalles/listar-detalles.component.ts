import { DetalleHistoriaClinicaService } from 'src/app/services/detalle-historia-clinica/detalle-historia-clinica.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Detalles } from 'src/app/models/detalles';
import { SweetAlertsService } from 'src/app/services/sweet-alerts.service';

@Component({
  selector: 'app-listar-detalles',
  templateUrl: './listar-detalles.component.html',
  styleUrls: ['./listar-detalles.component.css']
})
export class ListarDetallesComponent implements OnInit {
  detallesClinicos! : Detalles[]

  constructor(
    private router:Router,
    private detalleHistoriaClinicaService:DetalleHistoriaClinicaService,
    private sweetAlert:SweetAlertsService
    ) { }

  ngOnInit(): void {

    this.obtenerDetalles();
  }

  private obtenerDetalles(){
    this.detalleHistoriaClinicaService.obtener().subscribe(datos => {
      this.detallesClinicos = datos;
    })
  }

  goToHistoriaClinica(){
    this.router.navigate(['detalle-historia-clinica'])
  }

  editarDetalles(id:number){
    this.router.navigate(['/detalle-clinico', id])
  }

  eliminarDetalles(id:number){

    this.sweetAlert.sweetAlertEliminar().then( (resp) => {

      if(resp.value){

        this.detalleHistoriaClinicaService.eliminar(id).subscribe(() => this.obtenerDetalles() )
      }
    })
  }
}