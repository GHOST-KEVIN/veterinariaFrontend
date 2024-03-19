import { NgModule } from '@angular/core';
import { TableComponent } from './components/table.component';
import { SharedModule } from '../shared/shared.module';
import { ColumnValuePipe } from './pipes/column-value.pipe';



@NgModule({
  declarations: [
    TableComponent,
    ColumnValuePipe
  ],
  imports: [
    SharedModule
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
