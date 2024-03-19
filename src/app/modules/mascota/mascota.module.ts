import { NgModule } from '@angular/core';

import { MascotaRoutingModule } from './mascota-routing.module';
import { MascotaComponent } from './mascota.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { SharedModule } from '../shared/shared.module';
import { MascotaService } from './services/mascota.service';
import { TableModule } from '../table/table.module';


@NgModule({
  declarations: [
    MascotaComponent,
    MascotasComponent
  ],
  imports: [
    MascotaRoutingModule,
    SharedModule,
    TableModule
  ],
  providers: [
    MascotaService
  ]
})
export class MascotaModule { }
