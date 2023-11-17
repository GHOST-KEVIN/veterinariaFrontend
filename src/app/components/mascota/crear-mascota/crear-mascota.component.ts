import { UsuarioService } from './../../../services/usuario/usuario.service';
import { MascotaService } from './../../../services/mascota/mascota.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/models/mascota';
import { Usuario } from 'src/app/models/usuario';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-mascota',
  templateUrl: './crear-mascota.component.html',
  styleUrls: ['./crear-mascota.component.css']
})
export class CrearMascotaComponent implements OnInit {
  dataForm:FormGroup = new FormGroup({})
  mascota:Mascota = new Mascota()
  usuarios!:Usuario[]

  constructor(
    private router:Router,
    private mascotaService:MascotaService,
    private usuarioService:UsuarioService,
    )
    { }

  ngOnInit() {
    this.formBuilding()
    this.usuario()
  }

  formBuilding(){

    this.dataForm = new FormGroup({

      nombre: new FormControl( '', [Validators.required, Validators.maxLength(15)]),
      raza: new FormControl( '', [Validators.required, Validators.maxLength(20)]),
      sexo: new FormControl( '', [Validators.required, Validators.maxLength(15)]),
      usuario: new FormControl( '', [Validators.required, Validators.maxLength(1)])
    })
  }

  registrarMascota(){
    this.mascota.nombre = this.dataForm.value?.nombre;
    this.mascota.raza = this.dataForm.value?.raza;
    this.mascota.sexo = this.dataForm.value?.sexo;
    this.mascota.usuario.id = this.dataForm.value?.usuario;

    this.mascotaService.guardar(this.mascota).subscribe(() => {
      this.router.navigate(['/mascota'])
    })
  }

  usuario(){
    this.usuarioService.obtener().subscribe(data => {
      this.usuarios = data
    })
  }

}
