import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/models/mascota';
import { Usuario } from 'src/app/models/usuario';
import { MascotaService } from 'src/app/services/mascota/mascota.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { SweetAlertsService } from 'src/app/services/sweet-alerts.service';

@Component({
  selector: 'app-editar-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.css']
})
export class MascotaComponent implements OnInit {

  dataForm:FormGroup = new FormGroup({})
  id!:number
  mascota:Mascota = new Mascota()
  usuarios!:Usuario[]
  genero = [{gender:'Hembra'},{gender:'Macho'}]

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private mascotaService:MascotaService,
    private usuarioService:UsuarioService,
    private fb:FormBuilder,
    private sweetAlert:SweetAlertsService
    ) { }

  ngOnInit():void{
    
    const id = this.route.snapshot.params['id']

    this.usuario()
    this.FormBuilding()
    
    if(id !== 'nuevo'){
      
      this.obtenerData()
    }
  }

  private obtenerData(){

    this.id = this.route.snapshot.params['id']
    
    this.mascotaService.obtenerPorId(this.id).subscribe(data => {

      this.mascota = data;
      this.FormBuilding()
    })
  }

  private FormBuilding() {

    this.dataForm = this.fb.group({
      
      nombre: ['', [Validators.required, Validators.maxLength(15)]],
      raza: ['', [Validators.required, Validators.maxLength(20)]],
      sexo: [ null, [Validators.required, Validators.maxLength(15)]],
      usuarioId: [ null, [Validators.required, Validators.maxLength(1)]]
    });

    this.dataForm.patchValue(this.mascota);
  }
  

  private usuario(){
    this.usuarioService.obtener().subscribe(data => {
      this.usuarios = data;
    })
  }

  guardarMascota(){

    if(this.id){

      this.actualizarMascota()

    }else{

      this.registrarMascota()
    }
  }

  private registrarMascota(){

    this.mascota = this.dataForm.value
    
    this.mascotaService.guardar(this.mascota).subscribe(() => {

      this.sweetAlert.sweetAlertGuardar()
      this.goToMascotas()
    })
  }

  private actualizarMascota(){

    this.mascota = this.dataForm.value

    this.mascotaService.actualizar(this.id, this.mascota).subscribe(() => {
      
      this.sweetAlert.sweetAlertActualizarName(this.mascota.nombre)
      this.goToMascotas()
    })
  }

  private goToMascotas(){

    this.router.navigate(['/mascotas'])
  }
}