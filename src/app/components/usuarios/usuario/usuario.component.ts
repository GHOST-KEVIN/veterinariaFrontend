import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetAlertsService } from 'src/app/services/sweet-alerts.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  dataForm:FormGroup = new FormGroup({});
  usuario:Usuario = new Usuario();
  id!:number;

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
    }
  }

  formBuilding(){
    this.dataForm = this.fb.group({
      nombre: [ '', [Validators.required, Validators.maxLength(25)] ],
      apellido: [ '', [Validators.required, Validators.maxLength(25)] ],
      tipoDocumento: [ '', [Validators.required, Validators.maxLength(25)] ],
      documentoIdentificacion: [ null, [Validators.required, Validators.maxLength(25)] ],
      sexo: [ '', [Validators.required, Validators.maxLength(6)] ],
    })

    this.dataForm.patchValue(this.usuario);
  }

  obtenerData(){
    this.id = this.route.snapshot.params['id'];

    this.usuarioService.obtenerPorId(this.id).subscribe(datos => {
      this.usuario = datos;

      this.formBuilding()
    })
  }

  guardarUsuario(){
    if(this.id){

      this.actualizarUsuario()

    }else{
      this.registrarUsuario()
    }
  }

  registrarUsuario(){
    this.usuario = this.dataForm.value;

    this.usuarioService.registrar(this.usuario).subscribe(() => {

      this.sweetAlert.sweetAlertGuardar()
      this.goToUsuario()
    })
  }

  actualizarUsuario(){
    this.usuario = this.dataForm.value;

    this.usuarioService.actualizar(this.id, this.usuario).subscribe(() => {

      this.sweetAlert.sweetAlertActualizarName(this.usuario.nombre)
      this.goToUsuario()
    })
  }

  goToUsuario(){
    this.router.navigate(['/usuarios'])
  }
}