import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from './../../../services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  dataForm:FormGroup = new FormGroup({});
  usuario!:Usuario;
  id!:number;

  constructor(private route:ActivatedRoute, private usuarioService:UsuarioService, private router:Router) { }

  ngOnInit(): void {
    this.formBuilding();
    this.obtenerData();
  }

  formBuilding(){
    this.dataForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      apellido: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      tipoDocumento: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      documentoIdentificacion: new FormControl(null, [Validators.required, Validators.maxLength(25)]),
      sexo: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    })

    this.dataForm.patchValue(this.usuario);
  }

  obtenerData(){
    this.id = this.route.snapshot.params['id'];
    this.usuario = new Usuario();

    this.usuarioService.obtenerPorId(this.id).subscribe(datos => {
      this.usuario = datos;

      this.formBuilding()
    })
  }

  goToUsuario(){
    this.router.navigate(['usuario']);
  }

  actualizarUsuario(){
    this.usuario = this.dataForm.value;

    this.usuarioService.actualizar(this.id, this.usuario).subscribe(() => {

      this.goToUsuario();
    })
  }
}
