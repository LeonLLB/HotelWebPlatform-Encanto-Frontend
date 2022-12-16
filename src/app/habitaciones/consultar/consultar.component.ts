import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Habitacion } from 'src/app/interfaces/habitacion.interface';
import { ConfirmService } from 'src/app/services/confirm.service';
import { NotifyService } from 'src/app/services/notify.service';
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
  isFetching = {
    habitaciones:true,
  }

  paginationRange: number[] = []
  maxPagesInPaginationBar = 5

  limit = 5

  constructor(
    private habitacionesService: HabitacionService,
    private paginationService: PaginationService,
    private confirm: ConfirmService,
    private notify: NotifyService
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
    this.isFetching.habitaciones=true
    this.habitacionesService.getAll({
      paginationData:{
        limit:this.limit,
        offset:this.pagina-1
      },
    })
    .subscribe(response=>{
      this.isFetching.habitaciones=false
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
      if(response.errors && response.errors.length > 0){
        this.notify.failure(response.errors[0].message)
        return
      }
      console.log(response)
    })
  }

  eliminarHabitacion({id,numero}: Habitacion){
    this.confirm.danger({
      title:'Eliminar habitación N° ' + numero,
      message:'Esta seguro de querer eliminar esta habitación? Tenga en cuenta que eliminar está habitación tambien eliminará los alquileres y reportes financieros de la misma',
      okText:'Eliminar',
      onOk:()=>{
        this.habitacionesService.delete(id)
        .subscribe((response)=>{
          if (response.data?.removeHabitacion.id) {
            this.notify.success('Habitación eliminada con exito!')
            if(this.habitaciones.length === 1 && this.pagina > 1){
              this.paginas -= 1
              this.pagina -= 1
              this.paginationRange.pop()
            }
            this.paginate(this.pagina)
          }
        })
      }
    })
  }

}
