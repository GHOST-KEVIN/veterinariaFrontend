import { HistoriaClinicaService } from './../../../services/historia-clinica/historia-clinica.service';
import { HistoriaClinica } from 'src/app/models/historiaClinica';
import { DetalleHistoriaClinicaService } from 'src/app/services/detalle-historia-clinica/detalle-historia-clinica.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Detalles } from 'src/app/models/detalles';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Colaborador } from 'src/app/models/colaborador';
import { ColaboradorService } from 'src/app/services/colaborador/colaborador.service';


@Component({
  selector: 'app-editar-detalle',
  templateUrl: './editar-detalle.component.html',
  styleUrls: ['./editar-detalle.component.css']
})
export class EditarDetalleComponent implements OnInit {
  dataForm:FormGroup = new FormGroup({})
  id!:number;
  detalles:Detalles = new Detalles()
  historiasClinicas!:HistoriaClinica[]
  colaboradores!:Colaborador[]

  constructor(
    private route:ActivatedRoute,
    private detalleService:DetalleHistoriaClinicaService,
    private historiaClinicaService:HistoriaClinicaService,
    private colaboradorService:ColaboradorService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.fomrBuilding()
    this.obtenerData()
    this.historiaClinica()
    this.colaborador()
  }

  fomrBuilding(){
    this.dataForm = new FormGroup({
      temperatura: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      peso: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      frecuenciaCardiaca: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      frecuenciaRespiratoria: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      fechaHora: new FormControl('', [Validators.required]),
      alimentacion: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      habitad: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      observacion: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      historiaClinica: new FormControl('', [Validators.required]),
      colaborador: new FormControl('', [Validators.required])
    })

    this.dataForm.patchValue(this.detalles)
  }

  private obtenerData(){
    this.id = this.route.snapshot.params['id'];

    this.detalleService.obtenerPorId(this.id).subscribe(data => {
      this.detalles = data;

      this.fomrBuilding()
    })
  }

  historiaClinica(){
    this.historiaClinicaService.obtener().subscribe(datos => {
      this.historiasClinicas = datos
    })
  }

  colaborador(){
    this.colaboradorService.obtener().subscribe(data => {
      this.colaboradores = data;
    })
  }

  actualizarDetalles(){
    this.detalles.temperatura = this.dataForm.value.temperatura;
    this.detalles.peso = this.dataForm.value.peso;
    this.detalles.frecuenciaCardiaca = this.dataForm.value.frecuenciaCardiaca;
    this.detalles.frecuenciaRespiratoria = this.dataForm.value.frecuenciaRespiratoria;
    this.detalles.fechaHora = this.dataForm.value.fechaHora;
    this.detalles.alimentacion = this.dataForm.value.alimentacion;
    this.detalles.habitad = this.dataForm.value.habitad;
    this.detalles.observacion = this.dataForm.value.observacion;
    this.detalles.historiaClinica.id = this.dataForm.value.historiaClinica;
    this.detalles.colaborador.id = this.dataForm.value.colaborador;

    // console.log(this.detalles)
    this.detalleService.actualizar(this.id, this.detalles).subscribe(() => {
      this.router.navigate(['detalle-historia-clinica'])
    })
  }

}
