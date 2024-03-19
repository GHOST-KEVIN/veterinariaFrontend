import { Pipe, PipeTransform } from '@angular/core';
import { TableColumn } from '../models/table-column.mode';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'columnValue'
})
export class ColumnValuePipe implements PipeTransform {

  transform(row:any, column:TableColumn): unknown {
    let displayValue =  row[column.field];

    switch(column.dataType){
      case 'date':

          if(column.formatt !== undefined){
            displayValue = new DatePipe('en').transform(displayValue, column.formatt)
          }

        break
      case 'object':
        
        const arrayKeys = column.field.split('.')
        let currentValue:any
        arrayKeys.forEach((key:any) => {
          if(currentValue === undefined){
            currentValue = row[key]
            return
          }

          currentValue = currentValue[key]
          
        })

        displayValue = currentValue

      break
    }

    return displayValue
  }

}
