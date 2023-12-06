import { Router } from '@angular/router';
import { Colaborador } from 'src/app/models/colaborador';
import { ColaboradorService } from './../../../services/colaborador/colaborador.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-colaborador',
  templateUrl: './listar-colaborador.component.html',
  styleUrls: ['./listar-colaborador.component.css']
})
export class ListarColaboradorComponent implements OnInit {
  colaboradores!:Colaborador[]

  constructor(private colaboradorService:ColaboradorService, private router:Router) { }

  ngOnInit(): void {
    this.obtenerColaborador()
  }

  obtenerColaborador(){
    this.colaboradorService.obtener().subscribe(data => {
      this.colaboradores = data;
    })
  }

  editarColaborador(id:number){
    this.router.navigate(['/colaborador', id])
  }

  eliminarColaborador(id:number){
    alert('no se puede eliminar el colaborador')
  }
}