import { NgModule } from '@angular/core';

import { ColaboradorRoutingModule } from './colaborador-routing.module';
import { ColaboradorComponent } from './colaborador.component';
import { ColaboradoresComponent } from './components/colaboradores/colaboradores.component';
import { SharedModule } from '../shared/shared.module';
import { TableModule } from '../table/table.module';
import { ColaboradorService } from './services/colaborador.service';


@NgModule({
  declarations: [
    ColaboradorComponent,
    ColaboradoresComponent
  ],
  imports: [
    ColaboradorRoutingModule,
    SharedModule,
    TableModule
  ],
  providers: [
    ColaboradorService
  ]
})
export class ColaboradorModule { }
