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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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




@NgModule({
  declarations: [
    AppComponent,

    HistoriaClinicaComponent,
    RegistrarHistoriaClinicaComponent,
    EditarHistoriaClinicaComponent,

    ListarDetallesComponent,
    CrearDetalleComponent,
    EditarDetalleComponent,

    ListarUsuarioComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,


    ListarMascotaComponent,
    CrearMascotaComponent,
    EditarMascotaComponent,

    ListarColaboradorComponent,
    CrearColaboradorComponent,
    EditarColaboradorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
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
