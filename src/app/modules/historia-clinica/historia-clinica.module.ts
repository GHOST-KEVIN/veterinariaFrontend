import { NgModule } from '@angular/core';

import { HistoriaClinicaRoutingModule } from './historia-clinica-routing.module';
import { HistoriaClinicaComponent } from './historia-clinica.component';
import { HistoriasClinicasComponent } from './components/historias-clinicas/historias-clinicas.component';
import { HistoriaClinicaService } from './services/historia-clinica.service';
import { SharedModule } from '../shared/shared.module';
import { TableModule } from '../table/table.module';


@NgModule({
  declarations: [
    HistoriaClinicaComponent,
    HistoriasClinicasComponent
  ],
  imports: [
    HistoriaClinicaRoutingModule,
    SharedModule,
    TableModule
  ],
  providers: [
    HistoriaClinicaService
  ]
})
export class HistoriaClinicaModule { }
