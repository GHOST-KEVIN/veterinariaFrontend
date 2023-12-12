import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner'; // spinner
import { MessagesModule } from 'primeng/messages'; // alertas
import { RippleModule } from 'primeng/ripple';
import { KeyFilterModule } from 'primeng/keyfilter';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownModule,
    CalendarModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    SelectButtonModule,
    ProgressSpinnerModule,
    MessagesModule,
    RippleModule,
    KeyFilterModule
  ]
})
export class PrimeNgModule { }
