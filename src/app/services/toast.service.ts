import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class ToastService {

  constructor(private messageService:MessageService) { }

  showSuccess(titulo:string, descripcion:string){
    this.messageService.add({ severity:'success', summary:titulo, detail:descripcion })
  }

  showError(titulo:string, descripcion:string){
    this.messageService.add({ severity:'error', summary:titulo, detail:descripcion })
  }
}
