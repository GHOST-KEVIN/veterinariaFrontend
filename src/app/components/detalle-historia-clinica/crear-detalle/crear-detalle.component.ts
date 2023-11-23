import { HistoriaClinicaService } from './../../../services/historia-clinica/historia-clinica.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { Colaborador } from 'src/app/models/colaborador';
import { Detalles } from 'src/app/models/detalles';
import { HistoriaClinica } from 'src/app/models/historiaClinica';
import { ColaboradorService } from 'src/app/services/colaborador/colaborador.service';
import { DetalleHistoriaClinicaService } from 'src/app/services/detalle-historia-clinica/detalle-historia-clinica.service';

@Component({
  selector: 'app-crear-detalle',
  templateUrl: './crear-detalle.component.html',
  styleUrls: ['./crear-detalle.component.css']
})
export class CrearDetalleComponent implements OnInit {
  dataForm:FormGroup = new FormGroup({})
  detalles:Detalles = new Detalles();
  historiasClinicas!:HistoriaClinica[];
  colaboradores!:Colaborador[];

  constructor(
    private detalleHistoriaClinicaService:DetalleHistoriaClinicaService,
    private router:Router,
    private historiaClinicaService:HistoriaClinicaService,
    private colaboradorService:ColaboradorService
    ) { }
 
  ngOnInit(): void {
    this.formBuilding();
    this.historiaClinica();
    this.colaborador();
  }

  formBuilding(){
    this.dataForm = new FormGroup({
      temperatura: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      peso: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      frecuenciaCardiaca: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      frecuenciaRespiratoria: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      fechaHora: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      alimentacion: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      habitad: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      observacion: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      historiaClinica: new FormControl('', [Validators.required]),
      colaborador: new FormControl('', [Validators.required])
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

  goToDetalles(){
    this.router.navigate(['detalle-historia-clinica'])
  }

  registrarDetalles(){
    this.detalles.temperatura = this.dataForm.value.temperatura;
    this.detalles.peso = this.dataForm.value.peso;
    this.detalles.frecuenciaCardiaca = this.dataForm.value.frecuenciaCardiaca;
    this.detalles.frecuenciaRespiratoria = this.dataForm.value.frecuenciaRespiratoria;
    this.detalles.fechaHora = this.dataForm.value.fechaHora;
    this.detalles.alimentacion = this.dataForm.value.alimentacion;
    this.detalles.habitad = this.dataForm.value.habitad;
    this.detalles.observacion = this.dataForm.value.observacion;
    this.detalles.historiaClinicaId = this.dataForm.value.historiaClinica;
    this.detalles.colaboradorId = this.dataForm.value.colaborador;
    // console.log(this.detalles)

    this.detalleHistoriaClinicaService.guardar(this.detalles).subscribe(() => {
      this.goToDetalles()
    })
  }

}
