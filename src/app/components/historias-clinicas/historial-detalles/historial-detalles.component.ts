import { HistoriaClinicaService } from './../../../services/historia-clinica/historia-clinica.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Detalles } from 'src/app/models/detalles';
import { HistoriaClinica } from 'src/app/models/historiaClinica';

@Component({
  selector: 'app-historial-detalles',
  templateUrl: './historial-detalles.component.html',
  styles: [``]
})
export class HistorialDetallesComponent implements OnInit {

  historiaClinica = new HistoriaClinica()
  detallesClinicos : Detalles[] = []
  loading !: boolean

  constructor(private route:ActivatedRoute, private historiaService:HistoriaClinicaService) { }

  ngOnInit(): void {

    this.obtenerDatos();
  }

  private obtenerDatos(){

    const id = this.route.snapshot.params['id'];

    this.loading = true
    this.historiaService.obtenerPorId(id).subscribe((data:HistoriaClinica) => {
      this.historiaClinica = data;
      this.detallesClinicos = data.detallesClinicos;
      this.loading = false
    })
  }
}