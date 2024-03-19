import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoriaClinicaComponent } from './historia-clinica.component';
import { HistoriasClinicasComponent } from './components/historias-clinicas/historias-clinicas.component';

const routes: Routes = [
  {
    path: '', component: HistoriaClinicaComponent, children: [
      { path:'listar-historias', component:HistoriasClinicasComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoriaClinicaRoutingModule { }
