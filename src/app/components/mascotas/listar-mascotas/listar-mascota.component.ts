import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/models/mascota';
import { MascotaService } from 'src/app/services/mascota/mascota.service';
import { SweetAlertsService } from 'src/app/services/sweet-alerts.service';

@Component({
  selector: 'app-listar-mascota',
  templateUrl: './listar-mascota.component.html',
  styleUrls: ['./listar-mascota.component.css']
})
export class ListarMascotaComponent implements OnInit {

  mascotas:Mascota[] = []
  loading!:boolean

  constructor(
    private mascotaService:MascotaService,
    private router:Router,
    private sweetAlert:SweetAlertsService
    ) { }

  ngOnInit(): void {

    this.todasLasMascotas()
  }

  private todasLasMascotas(){

    this.loading = true

    this.mascotaService.obtener().subscribe( mascota => {
      this.mascotas = mascota;
      this.loading = false
    })
  }

  editarMascota(id:number){
    this.router.navigate(['mascota', id])
  }

  eliminarMascota(mascota:Mascota){

    this.sweetAlert.sweetAlertEliminarName(mascota.nombre).then( (resp) => {
      if(resp.value){
        
        this.mascotaService.eliminar(mascota.id).subscribe(() => this.todasLasMascotas() )
      }
      
    })
  }
}