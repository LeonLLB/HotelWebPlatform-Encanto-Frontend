import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Habitacion } from 'src/app/interfaces/habitacion.interface';

interface CardOption {
  icon: string
  onClick: () => void
}

@Component({
  selector: 'hwp-habitacion-card',
  template: `
    <div 
      class="transition-all animate-display_left w-80 gap-2 border-2 p-2 rounded-lg grid grid-cols-[3rem_minmax(0,1fr)_3rem] shadow-lg"
      [ngClass]="{
        'bg-green-400 border-green-600':habitacion.estado === 'D',
        'bg-red-400 border-red-600':habitacion.estado === 'O',
        'bg-blue-400 border-blue-600':habitacion.estado === 'M',
        '':habitacion.estado === undefined,
        'grid-cols-[3rem_minmax(0,1fr)_3rem]':options.length > 0,
        'grid-cols-[3rem_minmax(0,1fr)]': options.length === 0
      }"
      >
      <div class=" col-span-1 flex flex-col justify-center items-center">
        <span class="material-icons !text-5xl">bed</span>
      </div>
      <div>
        <div class="text-2xl font-light">Habitación N° <span class="font-bold">{{habitacion.numero}}</span></div>
        <div class="text-2xl font-light">Piso {{habitacion.piso}}</div>
        <div class="flex flex-row items-center text-2xl font-light" [title]="habitacion.tipo">Tipo: <span class="material-icons ml-2 !text-4xl">{{translateTipoIntoIcons}}</span></div>
        <div class="text-2xl font-semibold">{{estadoHabitacion}}</div>
      </div>
      <div *ngIf="options.length>0" class=" col-span-1 flex flex-col justify-evenly items-center">
        <button class="border rounded-md p-1 btn-transition shadow-lg" (click)="option.onClick()" *ngFor="let option of options"
        [ngClass]="{
          'bg-green-600 border-green-700 hover:bg-green-700':habitacion.estado === 'D',
          'bg-red-600 border-red-700 hover:bg-red-700':habitacion.estado === 'O',
          'bg-blue-600 border-blue-700 hover:bg-blue-700':habitacion.estado === 'M',
          '':habitacion.estado === undefined
        }"        
        >
          <span class="material-icons">{{option.icon}}</span>
        </button>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class HabitacionCardComponent implements OnInit {

  @Input() habitacion!: Habitacion
  @Input() options: CardOption[] = []
  @Input() loadDefaultCrudActions = true
  @Output() onDefaultUpdate = new EventEmitter<Habitacion>()
  @Output() onDefaultDelete = new EventEmitter<Habitacion>()
  @Output() onCardClick = new EventEmitter<Habitacion>()

  constructor() { }

  ngOnInit(): void {
    if (this.options && this.options.length > 4) throw new Error('Solo se permiten hasta 4 opciones CRUD')
    if (this.loadDefaultCrudActions) {
      this.options = [
        { icon: 'edit', onClick: () => { this.onDefaultUpdateDispatch() } },
        { icon: 'delete', onClick: () => { this.onDefaultDeleteDispatch() } },
      ]
    }
  }

  onDefaultUpdateDispatch() {
    this.onDefaultUpdate.emit(this.habitacion)
  }
  onDefaultDeleteDispatch() {
    this.onDefaultDelete.emit(this.habitacion)
  }
  onCardClickDispatch() {
    this.onCardClick.emit(this.habitacion)
  } 

  get translateTipoIntoIcons(): string {
    switch (this.habitacion.tipo) {
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

  get estadoHabitacion(): string {
    switch (this.habitacion.estado) {
      case 'D':
        return 'DISPONIBLE'
      case 'O':
        return 'OCUPADA'
      case 'M':
        return 'EN MANTENIMIENTO'
      default:
        return ''
    }
  }

}
