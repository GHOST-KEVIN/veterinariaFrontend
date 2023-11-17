import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HistoriaClinicaService } from '../../../services/historia-clinica/historia-clinica.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoriaClinica } from 'src/app/models/historiaClinica';
import { Mascota } from 'src/app/models/mascota';
import { MascotaService } from 'src/app/services/mascota/mascota.service';

@Component({
  selector: 'app-registrar-historia-clinica',
  templateUrl: './registrar-historia-clinica.component.html',
  styleUrls: ['./registrar-historia-clinica.component.css']
})
export class RegistrarHistoriaClinicaComponent implements OnInit {
  
  dataForm:FormGroup = new FormGroup({});
  historiaClinica:HistoriaClinica = new HistoriaClinica();
  mascotas!:Mascota[];
  
  constructor(private router:Router, private historiaClinicaService:HistoriaClinicaService, private mascotaService:MascotaService) { }

  ngOnInit(): void {
    this.formBuilding();
    this.mascota();
  }

  formBuilding(){
    this.dataForm = new FormGroup({
      fechaCreacion: new FormControl('', [Validators.required]),
      mascota: new FormControl('', [Validators.required])
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

  guardarConsulta(){
    this.historiaClinica.fechaCreacion = this.dataForm.value.fechaCreacion;
    this.historiaClinica.mascota.id = this.dataForm.value.mascota;
    
    this.historiaClinicaService.guardar(this.historiaClinica).subscribe(() => {
      this.goToHistoriaClinica();
    })
  }
}
