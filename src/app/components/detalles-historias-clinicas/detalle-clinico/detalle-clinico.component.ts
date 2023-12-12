import { HistoriaClinicaService } from 'src/app/services/historia-clinica/historia-clinica.service';
import { HistoriaClinica } from 'src/app/models/historiaClinica';
import { DetalleHistoriaClinicaService } from 'src/app/services/detalle-historia-clinica/detalle-historia-clinica.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Detalles } from 'src/app/models/detalles';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Colaborador } from 'src/app/models/colaborador';
import { ColaboradorService } from 'src/app/services/colaborador/colaborador.service';
import { SweetAlertsService } from 'src/app/services/sweet-alerts.service';

@Component({
  selector: 'app-editar-detalle',
  templateUrl: './detalle-clinico.component.html',
  styleUrls: ['./detalle-clinico.component.css']
})
export class DetalleClinicoComponent implements OnInit {
  
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
    private router:Router,
    private fb:FormBuilder,
    private sweetAlert:SweetAlertsService
    ) { }

  ngOnInit(): void {

    this.fomrBuilding()
    this.historiaClinica()
    this.colaborador()

    const id = this.route.snapshot.params['id'];
    if(id !== 'nuevo'){

      this.obtenerData()
    }
  }

  private fomrBuilding(){

    this.dataForm = this.fb.group({

      temperatura: [ '', [Validators.required, Validators.maxLength(15)] ],
      peso: [ null, [Validators.required, Validators.maxLength(15)] ],
      frecuenciaCardiaca: [ null, [Validators.required, Validators.maxLength(15)] ],
      frecuenciaRespiratoria: [ null, [Validators.required, Validators.maxLength(15)] ],
      fechaHora: [ '', [Validators.required] ],
      alimentacion: [ '', [Validators.required, Validators.maxLength(15)] ],
      habitad: [ '', [Validators.required, Validators.maxLength(15)] ],
      observacion: [ '', [Validators.required, Validators.maxLength(255)] ],
      historiaClinicaId: [ null, [Validators.required] ],
      colaboradorId: [ null, [Validators.required] ]
    })

    this.dataForm.patchValue(this.detalles)
  }

  private obtenerData(){
    this.id = this.route.snapshot.params['id'];

    this.detalleService.obtenerPorId(this.id).subscribe((data:any) => {
      
      data.fechaHora = new Date(data.fechaHora)
      this.detalles = data;
      this.fomrBuilding()
    })
  }

  private historiaClinica(){

    this.historiaClinicaService.obtener().subscribe(datos => {
      this.historiasClinicas = datos
    })
  }

  private colaborador(){

    this.colaboradorService.obtener().subscribe(data => {
      this.colaboradores = data;
    })
  }

  guardarDetalles(){

    if(this.id){

      this.actualizarDetalles()

    }else{

      this.registrarDetalles()
    }
  }

  private registrarDetalles(){
    
    this.detalles = this.dataForm.value

    this.detalleService.guardar(this.detalles).subscribe(() => {
      
      this.sweetAlert.sweetAlertGuardar()
      this.goToDetalles()
    })
  }

  private actualizarDetalles(){
    
    this.detalles = this.dataForm.value

    this.detalleService.actualizar(this.id, this.detalles).subscribe(() => {

      this.sweetAlert.sweetAlertActualizar()
      this.goToDetalles()
    })
  }

  goToDetalles(){
    this.router.navigate(['detalle-historia-clinica'])
  }
}