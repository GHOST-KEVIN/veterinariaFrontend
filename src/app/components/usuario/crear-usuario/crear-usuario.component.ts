import { Router } from '@angular/router';
import { UsuarioService } from './../../../services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  dataForm:FormGroup = new FormGroup({});
  usuario:Usuario = new Usuario();

  constructor(private usuarioService:UsuarioService, private router:Router) { }

  ngOnInit(){
    this.formBuilding()
  }

  formBuilding(){
    this.dataForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      apellido: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      tipoDocumento: new FormControl('', [Validators.required, Validators.maxLength(2)]),
      documentoIdentificacion: new FormControl(null,[Validators.required]),
      sexo: new FormControl('', [Validators.required, Validators.maxLength(6)])
    })
  }

  registrarUsuario(){
    this.usuario = this.dataForm.value;

    this.usuarioService.registrar(this.usuario).subscribe(() => {
      this.goToUsuario();
      
    })
  }

  

  goToUsuario(){
    this.router.navigate(['usuario']);
  }

}
