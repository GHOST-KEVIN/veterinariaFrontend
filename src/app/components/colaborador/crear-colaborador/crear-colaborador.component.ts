import { Router } from '@angular/router';
import { ColaboradorService } from './../../../services/colaborador/colaborador.service';
import { Component, OnInit } from '@angular/core';
import { Colaborador } from 'src/app/models/colaborador';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-colaborador',
  templateUrl: './crear-colaborador.component.html',
  styleUrls: ['./crear-colaborador.component.css']
})
export class CrearColaboradorComponent implements OnInit {
  dataForm:FormGroup = new FormGroup({});
  colaborador:Colaborador = new Colaborador();

  constructor(private colaboradorService:ColaboradorService, private router:Router) { }

  ngOnInit(): void {
    this.formBoulding()
  }

  formBoulding(){
    this.dataForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      apellido: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      cargo: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      especialidad: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      tipoDocumento: new FormControl('', [Validators.required, Validators.maxLength(2)]),
      documentoIdentificacion: new FormControl(null,[Validators.required]),
    })
  }

  registrarColaborador(){
    this.colaborador = this.dataForm.value;

    this.colaboradorService.guardar(this.colaborador).subscribe(() => {
      this.router.navigate(['/colaborador'])
    })
  }

}
