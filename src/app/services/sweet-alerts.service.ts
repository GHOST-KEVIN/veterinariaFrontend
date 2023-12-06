import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertsService {

  sweetAlertGuardar(){
    Swal.fire({
      title: 'Guardado',
      text: 'Informacion guardada con exito',
      icon: 'success',
      showConfirmButton:true
    })
  }

  sweetAlertActualizarName(nombre?:string){
    Swal.fire({
      title: nombre,
      text: 'Se actualizo correctamente',
      icon: 'success'
    })
  }

  sweetAlertEliminarName(nombre?:string){

    return Swal.fire({

      title: '¿Estas seguro?',
      text: `Estas seguro de eliminar a ${nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true

    })
  }

  sweetAlertActualizar(){
    Swal.fire({
      title: 'Actualizado',
      text: 'Se actualizo correctamente',
      icon: 'success'
    })
  }

  sweetAlertEliminar(){

    return Swal.fire({

      title: '¿Estas seguro?',
      text: `Estas seguro de eliminar esto`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true

    })
  }
}