import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-alert',
  template: `
    <p-messages [(value)]="messages" [enableService]="false" [closable]="false"></p-messages>
  `,
  styles: [``]
})
export class AlertComponent implements OnInit {

  messages:Message[] = [{severity: 'info', summary: 'Info', detail: 'No hay registros'}]

  constructor() { }

  ngOnInit(): void {
  }

}
