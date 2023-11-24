import { HistoriaClinica } from 'src/app/models/historiaClinica';
import { HistoriaClinicaService } from './../../../services/historia-clinica/historia-clinica.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/models/mascota';
import { MascotaService } from 'src/app/services/mascota/mascota.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editar-historia-clinica',
  templateUrl: './editar-historia-clinica.component.html',
  styleUrls: ['./editar-historia-clinica.component.css']
})
export class EditarHistoriaClinicaComponent implements OnInit {
  error = ''
  dataForm:FormGroup = new FormGroup({})
  id!:number
  historiaClinica:HistoriaClinica = new HistoriaClinica()
  mascotas!:Mascota[]

  constructor(private router:Router, private route:ActivatedRoute, private historiaClinicaService:HistoriaClinicaService, private mascotaService:MascotaService) { }

  ngOnInit(): void {
    this.formBuilding()
    this.obteniendoIDyDatos();
    this.mascota()
  }
  
  formBuilding(){
    this.dataForm = new FormGroup({
      fechaCreacion: new FormControl('', [Validators.required]),
      mascotaId: new FormControl('', [Validators.required, Validators.maxLength(1)])
    })

    this.dataForm.patchValue(this.historiaClinica)
  }

  obteniendoIDyDatos(){
    this.id = this.route.snapshot.params['id'];

    this.historiaClinicaService.obtenerPorId(this.id).subscribe(datos => {
      this.historiaClinica = datos;
      this.formBuilding();
    })
  }

  mascota(){
    this.mascotaService.obtener().subscribe(data => {
      this.mascotas = data
    })
  }

  goToHistoriaClinica(){
    this.router.navigate(['historia-clinica'])
  }

  actualizarConsulta(){
    this.historiaClinica.fechaCreacion = this.dataForm.value.fechaCreacion;
    this.historiaClinica.mascotaId = this.dataForm.value.mascotaId;

    this.historiaClinicaService.actualizar(this.id, this.historiaClinica).subscribe(() =>{
      this.goToHistoriaClinica();
    }, (error:HttpErrorResponse) => {
      this.error = error.error
    })
  }

}
