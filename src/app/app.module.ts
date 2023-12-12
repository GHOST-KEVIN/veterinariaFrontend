import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimeNgModule } from './modules/prime-ng/prime-ng.module';

import { AppComponent } from './app.component';

import { HistoriaClinicaComponent } from './components/historias-clinicas/historia-clinica/editar-historia-clinica.component';
import { ListarHistoriaClinicaComponent } from './components/historias-clinicas/listar-historia-clinica/historia-clinica.component';

import { ListarDetallesComponent } from './components/detalles-historias-clinicas/listar-detalles/listar-detalles.component';
import { DetalleClinicoComponent } from './components/detalles-historias-clinicas/detalle-clinico/detalle-clinico.component';

import { ListarUsuarioComponent } from './components/usuarios/listar-usuarios/listar-usuario.component';
import { UsuarioComponent } from './components/usuarios/usuario/usuario.component';
import { UsuarioMascotasComponent } from './components/usuarios/usuario-mascotas/usuario-mascotas.component';

import { ListarMascotaComponent } from './components/mascotas/listar-mascotas/listar-mascota.component';
import { MascotaComponent } from './components/mascotas/mascota/editar-mascota.component';

import { ListarColaboradorComponent } from './components/colaboradores/listar-colaboradores/listar-colaborador.component';
import { ColaboradorComponent } from './components/colaboradores/colaborador/colaborador.component';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AlertComponent } from './components/alert/alert.component';
import { HistorialDetallesComponent } from './components/historias-clinicas/historial-detalles/historial-detalles.component';


@NgModule({
  declarations: [
    
    AppComponent,

    ListarHistoriaClinicaComponent,
    HistoriaClinicaComponent,

    ListarDetallesComponent,
    DetalleClinicoComponent,

    ListarUsuarioComponent,
    UsuarioComponent,
    UsuarioMascotasComponent,
    
    ListarMascotaComponent,
    MascotaComponent,
    
    ListarColaboradorComponent,
    ColaboradorComponent,
    NavBarComponent,
    AlertComponent,
    HistorialDetallesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PrimeNgModule,  // Modulos de primeNg
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }