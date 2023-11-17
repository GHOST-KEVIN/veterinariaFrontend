import { Colaborador } from './../../../models/colaborador';
import { ActivatedRoute, Router } from '@angular/router';
import { ColaboradorService } from './../../../services/colaborador/colaborador.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-colaborador',
  templateUrl: './editar-colaborador.component.html',
  styleUrls: ['./editar-colaborador.component.css']
})
export class EditarColaboradorComponent implements OnInit {
  dataForm:FormGroup = new FormGroup({})
  id!:number;
  colaborador!:Colaborador
  constructor(private colaboradorService:ColaboradorService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.formBuilding();
    this.obtenerData();
  }

  obtenerData(){
    this.id = this.route.snapshot.params['id'];

    this.colaboradorService.obtenerPorId(this.id).subscribe(data => {
      this.colaborador = data;

      this.formBuilding()
    })
  }

  formBuilding(){
    this.dataForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      apellido: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      cargo: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      especialidad: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      tipoDocumento: new FormControl('', [Validators.required, Validators.maxLength(2)]),
      documentoIdentificacion: new FormControl(null,[Validators.required])
    })

    this.dataForm.patchValue(this.colaborador)
  }

  actualizarColaborador(){
    this.colaborador = this.dataForm.value;

    this.colaboradorService.actualizar(this.id, this.colaborador).subscribe(() => {
      this.router.navigate(['/colaborador'])
    })
  }
}
