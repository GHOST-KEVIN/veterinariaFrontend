import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HistoriaClinicaComponent } from './components/historia-clinica/listar-historia-clinica/historia-clinica.component';
import { RegistrarHistoriaClinicaComponent } from './components/historia-clinica/registrar-historia-clinica/registrar-historia-clinica.component';
import { EditarHistoriaClinicaComponent } from './components/historia-clinica/editar-historia-clinica/editar-historia-clinica.component';

import { ListarDetallesComponent } from './components/detalle-historia-clinica/listar-detalles/listar-detalles.component';
import { CrearDetalleComponent } from './components/detalle-historia-clinica/crear-detalle/crear-detalle.component';
import { EditarDetalleComponent } from './components/detalle-historia-clinica/editar-detalle/editar-detalle.component';

import { ListarUsuarioComponent } from './components/usuario/listar-usuario/listar-usuario.component';
import { CrearUsuarioComponent } from './components/usuario/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './components/usuario/editar-usuario/editar-usuario.component';

import { ListarMascotaComponent } from './components/mascota/listar-mascota/listar-mascota.component';
import { CrearMascotaComponent } from './components/mascota/crear-mascota/crear-mascota.component';
import { EditarMascotaComponent } from './components/mascota/editar-mascota/editar-mascota.component';

import { ListarColaboradorComponent } from './components/colaborador/listar-colaborador/listar-colaborador.component';
import { CrearColaboradorComponent } from './components/colaborador/crear-colaborador/crear-colaborador.component';
import { EditarColaboradorComponent } from './components/colaborador/editar-colaborador/editar-colaborador.component';

const routes: Routes = [
  {path:'historia-clinica', component:HistoriaClinicaComponent},
  {path:'crear-historia-clinica', component:RegistrarHistoriaClinicaComponent},
  {path:'editar-historia-clinica/:id', component:EditarHistoriaClinicaComponent},

  {path:'detalle-historia-clinica', component:ListarDetallesComponent},
  {path:'crear-detalle-clinico', component:CrearDetalleComponent},
  {path:'editar-detalle-clinico/:id', component:EditarDetalleComponent},
  
  {path:'usuario', component:ListarUsuarioComponent},
  {path:'crear-usuario', component:CrearUsuarioComponent},
  {path:'editar-usuario/:id', component:EditarUsuarioComponent},

  {path:'mascota', component:ListarMascotaComponent},
  {path:'crear-mascota', component:CrearMascotaComponent},
  {path:'editar-mascota/:id', component:EditarMascotaComponent},

  {path:'colaborador', component:ListarColaboradorComponent},
  {path:'crear-colaborador', component:CrearColaboradorComponent},
  {path:'editar-colaborador/:id', component:EditarColaboradorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
