import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { SweetAlertsService } from 'src/app/services/sweet-alerts.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  usuarios!:Usuario[]

  constructor(
    private usuarioService:UsuarioService,
    private router:Router,
    private sweetAlert:SweetAlertsService
    ) { }

  ngOnInit(): void {
    this.todosLosUsuarios();
  }

  private todosLosUsuarios(){
    this.usuarioService.obtener().subscribe(usuario => {
      this.usuarios = usuario;
    })
  }

  editarUsuario(id:number){
    this.router.navigate(['/usuario', id])
  }

  eliminarUsuario(usuario:Usuario){

    this.sweetAlert.sweetAlertEliminarName(usuario.nombre).then((res) => {

      if(res.value){

        this.usuarioService.eliminar(usuario.id).subscribe(() => this.todosLosUsuarios() )
      }
    })
    
    this.todosLosUsuarios();
  }
}