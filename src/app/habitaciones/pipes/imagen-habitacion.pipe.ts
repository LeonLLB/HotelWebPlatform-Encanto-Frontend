import { Pipe, PipeTransform } from '@angular/core';
import { Habitacion } from 'src/app/interfaces/habitacion.interface';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagenHabitacion'
})
export class ImagenHabitacionPipe implements PipeTransform {

  transform(habitacion: Habitacion): string {
    if(habitacion.imgUrl && !environment.production) return `${environment.apiUrl}/files/habitacion/foto/${habitacion.id}`
    if(habitacion.imgUrl && environment.production) return habitacion.imgUrl
    return 'assets/img/no-image.jpeg';
  }

}
