import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/models/mascota';
import { Usuario } from 'src/app/models/usuario';
import { MascotaService } from 'src/app/services/mascota/mascota.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-editar-mascota',
  templateUrl: './editar-mascota.component.html',
  styleUrls: ['./editar-mascota.component.css']
})
export class EditarMascotaComponent implements OnInit {
  dataForm:FormGroup = new FormGroup({})
  id!:number
  mascota:Mascota = new Mascota()
  usuarios!:Usuario[]

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private mascotaService:MascotaService,
    private usuarioService:UsuarioService
    ) { }

  ngOnInit():void{
    this.obtenerDatosPorId()
    this.FormBuilding()
    this.usuario()
  }

  
  private obtenerDatosPorId(){
    this.id = this.route.snapshot.params['id']
    
    this.mascotaService.obtenerPorId(this.id).subscribe(data => {
      this.mascota = data;
      // console.log(this.mascota)
      this.FormBuilding()
    })
  }
  
  FormBuilding(){
    this.dataForm = new FormGroup({

      nombre: new FormControl( '', [Validators.required, Validators.maxLength(15)]),
      raza: new FormControl( '', [Validators.required, Validators.maxLength(20)]),
      sexo: new FormControl( '', [Validators.required, Validators.maxLength(15)]),
      usuarioId: new FormControl( '', [Validators.required, Validators.maxLength(1)])
    })

    this.dataForm.patchValue(this.mascota)
  }

  usuario(){
    this.usuarioService.obtener().subscribe(data => {
      this.usuarios = data;
    })
  }

  actualizarMascota(){
    this.mascota.nombre = this.dataForm.value?.nombre;
    this.mascota.raza = this.dataForm.value?.raza;
    this.mascota.sexo = this.dataForm.value?.sexo;
    this.mascota.usuarioId = this.dataForm.value?.usuarioId;
    
    this.mascotaService.actualizar(this.id, this.mascota).subscribe(() => {
      this.router.navigate(['/mascota'])
    })
  }

}
