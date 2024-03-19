import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items:MenuItem[] = []

  ngOnInit(): void {
    this.navegacion()
  }

  private navegacion(){
    this.items = [
      {
        label : 'Colaborador',
        icon : 'pi pi-user',
        routerLink : 'colaborador/listar-colaboradores'
      },
      {
        label : 'Usuario',
        icon : 'pi pi-user',
        routerLink : 'usuario/listar-usuarios'
      },
      {
        label : 'Mascotas',
        icon : 'pi pi-heart-fill',
        routerLink : 'mascota/listar-mascotas'
      },
      {
        label : 'Historiales Clinicos',
        icon : 'pi pi-calendar',
        routerLink : 'historia-clinica/listar-historias'
      },
      {
        label : 'Detalles Historias Clinicas',
        icon : 'pi pi-check-square',
        routerLink : 'detalle-historia-clinica/listar-detalles-clinicos'
      }
    ]
  }
}