import { HistoriaClinica } from 'src/app/models/historiaClinica';
import { HistoriaClinicaService } from 'src/app/services/historia-clinica/historia-clinica.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/models/mascota';
import { MascotaService } from 'src/app/services/mascota/mascota.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SweetAlertsService } from 'src/app/services/sweet-alerts.service';

@Component({
  selector: 'app-editar-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {

  error = ''
  dataForm:FormGroup = new FormGroup({})
  id!:number
  historiaClinica:HistoriaClinica = new HistoriaClinica()
  mascotas!:Mascota[]

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private historiaClinicaService:HistoriaClinicaService,
    private mascotaService:MascotaService,
    private fb:FormBuilder,
    private sweetAlert:SweetAlertsService
    ) { }

  ngOnInit(): void {

    this.formBuilding()
    this.mascota()

    const id = this.route.snapshot.params['id'];
    if(id !== 'nuevo'){

      this.obtenerData();
    }
  }

  private obtenerData(){

    this.id = this.route.snapshot.params['id'];

    this.historiaClinicaService.obtenerPorId(this.id).subscribe(datos => {
      this.historiaClinica = datos;
      this.formBuilding();
    })
  }

  private formBuilding(){

    this.dataForm = this.fb.group({

      fechaCreacion: [ '', [Validators.required] ],
      mascotaId: [ '', [Validators.required, Validators.maxLength(1)] ]
    })

    this.dataForm.patchValue(this.historiaClinica)
  }

  private mascota(){

    this.mascotaService.obtener().subscribe(data => {
      this.mascotas = data
    })
  }

  guardarConsulta(){

    if(this.id){

      this.actualizarConsulta()

    }else{

      this.registrarConsulta()
    }
  }

  private registrarConsulta(){

    this.historiaClinica = this.dataForm.value
    
    this.historiaClinicaService.guardar(this.historiaClinica).subscribe(() => {

      this.sweetAlert.sweetAlertGuardar()
      this.goToHistoriaClinica();

    }, (error:HttpErrorResponse) => {
      this.error = error.error
    })

  }

  private actualizarConsulta(){

    this.historiaClinica = this.dataForm.value

    this.historiaClinicaService.actualizar(this.id, this.historiaClinica).subscribe(() =>{

      this.sweetAlert.sweetAlertActualizar()
      this.goToHistoriaClinica();

    }, (error:HttpErrorResponse) => {
      this.error = error.error
    })
  }

  goToHistoriaClinica(){

    this.router.navigate(['/historias-clinicas'])
  }
}