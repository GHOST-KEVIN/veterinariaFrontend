import { Router } from '@angular/router';
import { UsuarioService } from './../../../services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  usuarios!:Usuario[]

  constructor(private usuarioService:UsuarioService, private router:Router) { }

  ngOnInit(): void {
    this.todosLosUsuarios();
  }

  private todosLosUsuarios(){
    this.usuarioService.obtener().subscribe(usuario => {
      this.usuarios = usuario;
    })
  }

  goToViewMascota(){
    this.router.navigate([''])
  }

  editarUsuario(id:number){
    this.router.navigate(['/editar-usuario', id])
  }


  eliminarUsuario(id:number){
    this.usuarioService.eliminar(id).subscribe(() => {
      this.todosLosUsuarios()
    })

    this.todosLosUsuarios();
  }

}
