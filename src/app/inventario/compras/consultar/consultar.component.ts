import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Compra } from 'src/app/interfaces/compra.interface';
import { ConfirmService } from 'src/app/services/confirm.service';
import { NotifyService } from 'src/app/services/notify.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { ComprasService } from '../services/compras.service';

@Component({
  selector: 'hwp-consultar',
  templateUrl: './consultar.component.html',
  styles: [
  ]
})
export class ConsultarComponent implements OnInit {

  compras: Compra[] = []
  paginas!: number
  pagina: number = 1
  total!: number
  isFetching = true

  paginationRange: number[] = []
  maxPagesInPaginationBar = 5

  limit = 5

  // filterForm = this.fb.group({
  //   numero: [null as unknown as number, [Validators.min(1)]],
  //   piso: [null as unknown as number, [Validators.min(1)]],
  //   tipo: '',
  //   caracteristica: '',
  //   estado: ''
  // })

  constructor(
    private comprasService: ComprasService,
    private paginationService: PaginationService,
    private fb: FormBuilder,
    private confirm: ConfirmService,
    private notify: NotifyService
  ) { }

  ngOnInit(): void {
    this.fetchCompras()
  }

  tc(data:any){
    return data as Compra
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

    this.fetchCompras(false)

  }

  onLimitChange(newLimit: EventTarget) {

    this.limit = ((newLimit as any).value)
    this.pagina = 1

    this.fetchCompras()
  }

  fetchCompras(forceReload = true){
    this.isFetching=true
    this.comprasService.getAll({
      paginationData:{
        limit:this.limit,
        offset:this.pagina-1
      },
      // filterForm:this.filterForm
    })
    .subscribe(response=>{
      this.isFetching=false
      if(response.data && response.data.compras.result.length>0 ){
        const data = response.data.compras
        if(forceReload){
          this.paginas=response.data.compras.pages
          this.paginationRange = []
          for (let i = 1; i <= data.pages; i++) {
            if (i > this.maxPagesInPaginationBar) break;
            this.paginationRange.push(i)
          }
        }
        this.compras=data.result
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

  // eliminarHabitacion({_id,numero}: Habitacion){
  //   this.confirm.danger({
  //     title:'Eliminar habitación N° ' + numero,
  //     message:'Esta seguro de querer eliminar esta habitación? Tenga en cuenta que eliminar está habitación tambien eliminará los alquileres y reportes financieros de la misma',
  //     okText:'Eliminar',
  //     onOk:()=>{
  //       this.habitacionesService.delete(_id)
  //       .subscribe((response)=>{
  //         if (response.data?.removeHabitacion._id) {
  //           this.notify.success('Habitación eliminada con exito!')
  //           if(this.habitaciones.length === 1 && this.pagina > 1){
  //             this.paginas -= 1
  //             this.pagina -= 1
  //             this.paginationRange.pop()
  //           }
  //           this.paginate(this.pagina)
  //         }
  //       })
  //     }
  //   })
  // }
}
