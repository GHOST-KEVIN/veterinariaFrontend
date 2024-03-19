import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetalleHistoriaClinicaRoutingModule } from './detalle-historia-clinica-routing.module';
import { DetalleHistoriaClinicaComponent } from './detalle-historia-clinica.component';
import { DetallesHistoriasClinicasComponent } from './components/detalles-historias-clinicas/detalles-historias-clinicas.component';
import { SharedModule } from '../shared/shared.module';
import { TableModule } from '../table/table.module';
import { DetalleHistoriaClinicaService } from './services/detalle-historia-clinica.service';

@NgModule({
  declarations: [
    DetalleHistoriaClinicaComponent,
    DetallesHistoriasClinicasComponent,
  ],
  imports: [
    DetalleHistoriaClinicaRoutingModule,
    SharedModule,
    TableModule
  ],
  providers: [
    DetalleHistoriaClinicaService
  ]
})
export class DetalleHistoriaClinicaModule { }
