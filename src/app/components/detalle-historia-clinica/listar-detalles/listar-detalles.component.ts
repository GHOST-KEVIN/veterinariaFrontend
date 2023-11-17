import { DetalleHistoriaClinicaService } from 'src/app/services/detalle-historia-clinica/detalle-historia-clinica.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Detalles } from 'src/app/models/detalles';
@Component({
  selector: 'app-listar-detalles',
  templateUrl: './listar-detalles.component.html',
  styleUrls: ['./listar-detalles.component.css']
})
export class ListarDetallesComponent implements OnInit {
  detallesClinicos! : Detalles[]

  constructor(private router:Router, private detalleHistoriaClinicaService:DetalleHistoriaClinicaService) { }

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
    this.router.navigate(['editar-detalle-clinico', id])
  }

  eliminarDetalles(id:number){
    this.detalleHistoriaClinicaService.eliminar(id).subscribe(() => {
      this.obtenerDetalles();
    })
  }
  
}
