import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarHistoriaClinicaComponent } from './components/historias-clinicas/listar-historia-clinica/historia-clinica.component';
import { HistoriaClinicaComponent } from './components/historias-clinicas/historia-clinica/editar-historia-clinica.component';

import { ListarDetallesComponent } from './components/detalles-historias-clinicas/listar-detalles/listar-detalles.component';
import { DetalleClinicoComponent } from './components/detalles-historias-clinicas/detalle-clinico/detalle-clinico.component';

import { ListarUsuarioComponent } from './components/usuarios/listar-usuarios/listar-usuario.component';
import { UsuarioComponent } from './components/usuarios/usuario/usuario.component';

import { ListarMascotaComponent } from './components/mascotas/listar-mascotas/listar-mascota.component';
import { MascotaComponent } from './components/mascotas/mascota/editar-mascota.component';

import { ListarColaboradorComponent } from './components/colaboradores/listar-colaboradores/listar-colaborador.component';
import { ColaboradorComponent } from './components/colaboradores/colaborador/colaborador.component';

const routes: Routes = [

  {path:'historias-clinicas', component:ListarHistoriaClinicaComponent},
  {path:'historia-clinica/:id', component:HistoriaClinicaComponent},

  {path:'detalle-historia-clinica', component:ListarDetallesComponent},
  {path:'detalle-clinico/:id', component:DetalleClinicoComponent},
  
  {path:'usuarios', component:ListarUsuarioComponent},
  {path:'usuario/:id', component:UsuarioComponent},

  {path:'mascotas', component:ListarMascotaComponent},
  {path:'mascota/:id', component:MascotaComponent},

  {path:'colaboradores', component:ListarColaboradorComponent},
  {path:'colaborador/:id', component:ColaboradorComponent},

  {path:'**', pathMatch:'full', redirectTo:'colaboradores'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
