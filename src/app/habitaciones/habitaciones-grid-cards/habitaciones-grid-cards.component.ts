import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Habitacion } from 'src/app/interfaces/habitacion.interface';
import { HabitacionService } from '../services/habitacion.service';

@Component({
  selector: 'hwp-habitaciones-grid-cards',
  template: `
    <div [Block]="isFetching">
      <div *ngIf="habitaciones.length>0" class="grid grid-cols-5 gap-y-8 gap-x-2">
        <hwp-habitacion-card
          *ngFor="let habitacion of habitaciones"
          [habitacion]="habitacion"
          [loadDefaultCrudActions]="false"
          (onCardClick)="onClick($event)"
          [hoverable]="hoverable"
          ></hwp-habitacion-card>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class HabitacionesGridCardsComponent implements OnInit {

  @Input() habitaciones:Habitacion[] = []
  @Input() hoverable = false
  @Output() onHabitacionClick = new EventEmitter<Habitacion>()

  isFetching = true  

  constructor(
    private habitacionService: HabitacionService
  ) { }

  ngOnInit(): void {    
    this.habitacionService.getAll({
      doPaginate:false
    })
    .subscribe((data)=>{
      this.habitaciones = data.data ? data.data.habitaciones.result : []
      this.isFetching = false
    })
  }

  onClick(habitacion: Habitacion){
    this.onHabitacionClick.emit(habitacion)
  }

}
