import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleHistoriaClinicaComponent } from './detalle-historia-clinica.component';
import { DetallesHistoriasClinicasComponent } from './components/detalles-historias-clinicas/detalles-historias-clinicas.component';

const routes: Routes = [
  {
    path: '', component: DetalleHistoriaClinicaComponent, children: [
      { path:'listar-detalles-clinicos', component:DetallesHistoriasClinicasComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalleHistoriaClinicaRoutingModule { }
