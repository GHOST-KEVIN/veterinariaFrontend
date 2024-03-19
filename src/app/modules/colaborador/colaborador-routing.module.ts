import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColaboradorComponent } from './colaborador.component';
import { ColaboradoresComponent } from './components/colaboradores/colaboradores.component';

const routes: Routes = [
  {
    path: '', component: ColaboradorComponent, children:[
      { path:'listar-colaboradores', component:ColaboradoresComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColaboradorRoutingModule { }
