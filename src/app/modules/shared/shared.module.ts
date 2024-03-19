import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { RippleModule } from 'primeng/ripple';
import { KeyFilterModule } from 'primeng/keyfilter';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    TabMenuModule,
  ],
  exports: [
    NavbarComponent,

    FormsModule,
    ReactiveFormsModule,

    CommonModule,
    DialogModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    ToolbarModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    SelectButtonModule,
    ProgressSpinnerModule,
    MessagesModule,
    RippleModule,
    KeyFilterModule,
    ConfirmDialogModule,
    TooltipModule,
    
  ]
})
export class SharedModule { }
