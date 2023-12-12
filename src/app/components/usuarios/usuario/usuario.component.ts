import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetAlertsService } from 'src/app/services/sweet-alerts.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  dataForm:FormGroup = new FormGroup({});
  usuario:Usuario = new Usuario();
  id!:number;
  error : string = ''
  idGuardado?:any

  stateOptions:any[] = [{label:'Activo', value:true}, {label:'Inactivo', value:false}]
  genero = [{gender:'Hombre'}, {gender:'Mujer'}, {gender:'Otro'}]
  tipoDocumento = [
    {label:'Cedula de Ciudadania'},
    {label:'Tarjeta de Identidad'},
    {label:'Cedula de Extranjeria'}
  ]

  constructor(
    private route:ActivatedRoute,
    private usuarioService:UsuarioService,
    private router:Router,
    private fb:FormBuilder,
    private sweetAlert:SweetAlertsService
    ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];
    this.formBuilding();
    
    if(id !== 'nuevo'){
      
      this.obtenerData();
      localStorage.setItem('id', id)
      this.idGuardado = localStorage.getItem('id')
    }
    
  }

  private formBuilding(){
    this.dataForm = this.fb.group({
      nombre: [ '', [Validators.required, Validators.maxLength(25)] ],
      apellido: [ '', [Validators.required, Validators.maxLength(25)] ],
      tipoDocumento: [ null, [Validators.required, Validators.maxLength(30)] ],
      documentoIdentificacion: [ null, [Validators.required, Validators.maxLength(25)] ],
      estado: [ true, [Validators.required] ],
      sexo: [ null, [Validators.required, Validators.maxLength(6)] ],
    })

    this.dataForm.patchValue(this.usuario);
  }

  private obtenerData(){
    this.id = this.route.snapshot.params['id'];
    
    this.usuarioService.obtenerPorId(this.id).subscribe(datos => {
      this.usuario = datos;
      this.formBuilding()
      // this.dataForm.get('nombre')?.disable()
      // this.dataForm.get('apellido')?.disable()
      // this.dataForm.get('tipoDocumento')?.disable()
      // this.dataForm.get('documentoIdentificacion')?.disable()
    })
  }

  guardarUsuario(){
    if(this.id){

      this.actualizarUsuario()

    }else{
      this.registrarUsuario()
    }
  }

  private registrarUsuario(){
    this.usuario = this.dataForm.value;
    
    this.usuarioService.registrar(this.usuario).subscribe(() => {

      this.sweetAlert.sweetAlertGuardar()
      this.goToUsuario()
    },(error:HttpErrorResponse) => this.error = error.error )
  }

  private actualizarUsuario(){
    this.usuario = this.dataForm.value;

    this.usuarioService.actualizar(this.id, this.usuario).subscribe(() => {

      this.sweetAlert.sweetAlertActualizarName(this.usuario.nombre)
      this.goToUsuario()
    }, (error:HttpErrorResponse) => this.error = error.error )
  }

  goToUsuario(){
    this.router.navigate(['/usuarios'])
  }
}