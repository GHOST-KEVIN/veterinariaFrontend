import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

const routes: Routes = [
  {
    path: '', component: UsuarioComponent, children:[
      { path: 'listar-usuarios', component:UsuariosComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
