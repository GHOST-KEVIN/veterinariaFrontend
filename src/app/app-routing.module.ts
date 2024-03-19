import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path:'', redirectTo:'colaborador/listar-colaboradores', pathMatch:'full'},

  { path: 'usuario', loadChildren: () => import('./modules/usuario/usuario.module').then(m => m.UsuarioModule) },

  { path: 'colaborador', loadChildren: () => import('./modules/colaborador/colaborador.module').then(m => m.ColaboradorModule) },

  { path: 'mascota', loadChildren: () => import('./modules/mascota/mascota.module').then(m => m.MascotaModule) },

  { path: 'historia-clinica', loadChildren: () => import('./modules/historia-clinica/historia-clinica.module').then(m => m.HistoriaClinicaModule) },

  { path: 'detalle-historia-clinica', loadChildren: () => import('./modules/detalle-historia-clinica/detalle-historia-clinica.module').then(m => m.DetalleHistoriaClinicaModule) },

  {path:'**', redirectTo:'colaborador/listar-colaboradores', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
