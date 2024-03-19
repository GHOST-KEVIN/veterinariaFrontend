import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotaComponent } from './mascota.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';

const routes: Routes = [
  {
    path: '', component: MascotaComponent, children: [
      { path:'listar-mascotas', component:MascotasComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MascotaRoutingModule { }
