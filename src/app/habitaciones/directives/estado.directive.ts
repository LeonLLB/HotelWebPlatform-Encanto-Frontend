import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { EstadoHabitacion } from '../graphql/queries';

@Directive({
  selector: '[estadoHabitacion]'
})
export class EstadoHabitacionDirective implements OnInit {

  @Input() estado!: EstadoHabitacion
  @Input() coloredClasses = {
    D: 'bg-green-400', //Disponible
    O: 'bg-red-400', //Ocupada
    M: 'bg-blue-400' //Mantenimiento
  }

  constructor(
    private htmlElement: ElementRef<HTMLElement>,
  ) { }

  ngOnInit(): void {
    this.setRequiredClasses()
    this.setInnerHTML()
  }

  setRequiredClasses(){
    this.htmlElement.nativeElement.classList.add(this.coloredClasses[this.estado])
  }

  setInnerHTML(){
    if(this.estado === 'D') this.htmlElement.nativeElement.innerText = 'Disponible'
    else if(this.estado === 'O') this.htmlElement.nativeElement.innerText = 'Ocupada'
    else if(this.estado === 'M') this.htmlElement.nativeElement.innerText = 'Mantenimiento'
  }

}
