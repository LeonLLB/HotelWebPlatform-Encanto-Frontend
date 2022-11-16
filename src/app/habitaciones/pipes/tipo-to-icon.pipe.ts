import { Pipe, PipeTransform } from '@angular/core';
import {TipoHabitacion} from 'src/app/interfaces/habitacion.interface'

@Pipe({
  name: 'tipoToIcon'
})
export class TipoToIconPipe implements PipeTransform {

  transform(value: TipoHabitacion): string {
    switch(value){
      case 'Singular':
        return 'single_bed'
      case 'Matrimonial':
        return 'bed'
      case 'Doble Singular':
        return 'single_bed single_bed'
      case 'Singular - Matrimonial':
        return 'single_bed bed'
    }
  }

}
