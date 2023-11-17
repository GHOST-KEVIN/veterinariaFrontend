import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/models/mascota';
import { MascotaService } from 'src/app/services/mascota/mascota.service';

@Component({
  selector: 'app-listar-mascota',
  templateUrl: './listar-mascota.component.html',
  styleUrls: ['./listar-mascota.component.css']
})
export class ListarMascotaComponent implements OnInit {
  mascotas!:Mascota[]

  constructor(private mascotaService:MascotaService, private router:Router) { }

  ngOnInit(): void {
    this.todasLasMascotas()
  }

  private todasLasMascotas(){
    this.mascotaService.obtener().subscribe( mascota => {
      this.mascotas = mascota;
    })
  }

  editarMascota(id:number){
    this.router.navigate(['editar-mascota', id])
  }

  eliminarMascota(id:number){
    this.mascotaService.eliminar(id).subscribe(() => {
      this.todasLasMascotas();
    })
  }

}
