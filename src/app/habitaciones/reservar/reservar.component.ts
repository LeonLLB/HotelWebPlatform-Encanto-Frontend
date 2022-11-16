import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Habitacion } from 'src/app/interfaces/habitacion.interface';

@Component({
  selector: 'hwp-reservar',
  templateUrl: './reservar.component.html',
  styles: [
  ]
})
export class ReservarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onHabitacionClick(habitacion: Habitacion){
    if(habitacion.estado === 'D'){
      this.router.navigate(['/main','habitaciones','alquilar',habitacion._id])
    }
  }

}
