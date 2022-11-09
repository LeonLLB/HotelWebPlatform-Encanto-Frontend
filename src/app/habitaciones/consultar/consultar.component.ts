import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Habitacion } from 'src/app/interfaces/habitacion.interface';
import { PaginationService } from 'src/app/services/pagination.service';
import { HabitacionService } from '../services/habitacion.service';

@Component({
  selector: 'hwp-consultar',
  templateUrl: './consultar.component.html',
  styles: [
  ]
})
export class ConsultarComponent implements OnInit {

  habitaciones: Habitacion[] = []
  paginas!: number
  pagina: number = 1
  total!: number
  isFetching = true

  paginationRange: number[] = []
  maxPagesInPaginationBar = 5

  limit = 5

  constructor(
    private habitacionesService: HabitacionService,
    private paginationService: PaginationService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.fetchHabitaciones()
  }

  th(habitacion:any){
    return habitacion as Habitacion
  }

  paginate(page: number | string) {

    const {newPaginationRange,newPage} = this.paginationService.paginate({
      page,
      paginationRange: this.paginationRange,
      maxPagesInPaginationBar: this.maxPagesInPaginationBar,
      currentPage: this.pagina,
      paginas: this.paginas
    })

    this.paginationRange = newPaginationRange
    this.pagina = newPage

    this.fetchHabitaciones(false)

  }

  onLimitChange(newLimit: EventTarget) {

    this.limit = ((newLimit as any).value)
    this.pagina = 1

    this.fetchHabitaciones()
  }

  fetchHabitaciones(forceReload = true){
    this.isFetching=true
    this.habitacionesService.getAll({
      paginationData:{
        limit:this.limit,
        offset:this.pagina-1
      }
    })
    .subscribe(response=>{
      this.isFetching=false
      if(response.data && response.data.habitaciones.result.length>0 ){
        const data = response.data.habitaciones
        if(forceReload){
          this.paginas=response.data.habitaciones.pages
          this.paginationRange = []
          for (let i = 1; i <= data.pages; i++) {
            if (i > this.maxPagesInPaginationBar) break;
            this.paginationRange.push(i)
          }
        }
        this.habitaciones=data.result
        this.total = data.total
        return
      }
      console.log(response)
    })
  }

}
