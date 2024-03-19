import { NgModule } from '@angular/core';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { SharedModule } from '../shared/shared.module';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { TableModule } from '../table/table.module';
import { ColaboradorRoutingModule } from '../colaborador/colaborador-routing.module';
import { UsuarioService } from './service/usuario.service';

@NgModule({
  declarations: [
    UsuarioComponent,
    UsuariosComponent
  ],
  imports: [
    UsuarioRoutingModule,
    ColaboradorRoutingModule,
    SharedModule,
    TableModule
  ],
  providers: [
    UsuarioService
  ]
})
export class UsuarioModule { }
