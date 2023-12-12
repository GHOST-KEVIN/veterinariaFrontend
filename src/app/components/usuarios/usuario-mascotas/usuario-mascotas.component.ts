import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mascota } from 'src/app/models/mascota';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-usuario-mascotas',
  templateUrl: './usuario-mascotas.component.html',
  styles: [``]
})
export class UsuarioMascotasComponent implements OnInit {

  usuario : Usuario = new Usuario();
  mascotas : Mascota[] = [];
  loading !: boolean

  constructor(private usuarioService:UsuarioService, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.usuarioMascota()
  }

  private usuarioMascota(){
    let id = this.route.snapshot.params['id']
  
    this.loading = true
    this.usuarioService.obtenerPorId(id).subscribe(data => {
      this.usuario = data 
      this.mascotas = data.mascotas
      this.loading = false
    })
  }

}