import { Colaborador } from '../../../models/colaborador';
import { ActivatedRoute, Router } from '@angular/router';
import { ColaboradorService } from '../../../services/colaborador/colaborador.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetAlertsService } from 'src/app/services/sweet-alerts.service';

@Component({
  selector: 'app-editar-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.css']
})
export class ColaboradorComponent implements OnInit {

  dataForm:FormGroup = new FormGroup({})
  id!:number;
  colaborador!:Colaborador

  constructor(
    private colaboradorService:ColaboradorService,
    private route:ActivatedRoute,
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

  obtenerData(){
    this.id = this.route.snapshot.params['id'];

    this.colaboradorService.obtenerPorId(this.id).subscribe(data => {
      this.colaborador = data;

      this.formBuilding()
    })
  }

  formBuilding(){

    this.dataForm = this.fb.group({

      nombre: [ '', [Validators.required, Validators.maxLength(25)] ],
      apellido: [ '', [Validators.required, Validators.maxLength(25)] ],
      cargo: [ '', [Validators.required, Validators.maxLength(25)] ],
      especialidad: [ '', [Validators.required, Validators.maxLength(25)] ],
      tipoDocumento: [ '', [Validators.required, Validators.maxLength(2)] ],
      documentoIdentificacion: [ null,[Validators.required] ]
    })

    this.dataForm.patchValue(this.colaborador)
  }

  guardarColaborador(){

    if(this.id){

      this.actualizarColaborador()

    }else{

      this.registrarColaborador()
    }
  }

  registrarColaborador(){

    this.colaborador = this.dataForm.value;

    this.colaboradorService.guardar(this.colaborador).subscribe(() => {

      this.sweetAlert.sweetAlertGuardar()
      this.goToColaboradores()
    })
  }

  actualizarColaborador(){

    this.colaborador = this.dataForm.value;

    this.colaboradorService.actualizar(this.id, this.colaborador).subscribe(() => {

      this.sweetAlert.sweetAlertActualizarName(this.colaborador.nombre)
      this.goToColaboradores()
    })
  }

  goToColaboradores(){

    this.router.navigate(['/colaboradores'])
  }
}