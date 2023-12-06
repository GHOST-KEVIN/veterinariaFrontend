import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

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
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    
    AppComponent,

    ListarHistoriaClinicaComponent,
    HistoriaClinicaComponent,

    ListarDetallesComponent,
    DetalleClinicoComponent,

    ListarUsuarioComponent,
    UsuarioComponent,


    ListarMascotaComponent,
    MascotaComponent,

    ListarColaboradorComponent,
    ColaboradorComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DropdownModule,
    BrowserAnimationsModule,
    CalendarModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }