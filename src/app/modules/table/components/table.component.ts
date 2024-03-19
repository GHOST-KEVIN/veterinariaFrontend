import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Table } from 'primeng/table';
import { TableColumn } from '../models/table-column.mode';
import { TableConfig } from '../models/table-config.model';
import { TableAction } from '../models/table-action.model';
import { TABLE_ACTION } from '../enums/table-action.enum';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  titleTable!:string
  @Input() set setTitleTable(titulo:string){
    this.titleTable = titulo
  }

  tableConfig!:TableConfig
  @Input() set setTableConfig(config:TableConfig){
    this.tableConfig = config
  }

  dataSource:any[] = []
  @Input() set data(data:any){
    this.dataSource = data
  }

  tableColumns:TableColumn[] = []
  @Input() set columns(columns:TableColumn[]){
    this.tableColumns = columns;
  }

  filterField:string[] = []
  @Input() set filtersField(filter:string[]){
    this.filterField = filter
  }

  btnObservar?:string
  @Input() set setBtnObserver(tooltip:string){
    this.btnObservar = tooltip
  }

  @Output() action:EventEmitter<TableAction> = new EventEmitter()

  @ViewChild('dt') dt?: Table;
  searchTerm: FormControl = new FormControl('')

  onSearchInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement)?.value;

    this.dt?.filterGlobal(inputValue, 'contains');
  }

  clearSearch() {
    this.searchTerm.setValue('');
    this.dt!.filterGlobal('', 'contains');
  }

  onCrear(){
    this.action.emit({action:TABLE_ACTION.CREAR })
  }

  onEditar(row:any){
    this.action.emit({action:TABLE_ACTION.EDITAR, row})
  }

  onEliminar(row:any){
    this.action.emit({action:TABLE_ACTION.ELIMINAR, row})
  }

  onObservar(row:any){
    this.action.emit({action:TABLE_ACTION.OBSERVAR, row})
  }
}