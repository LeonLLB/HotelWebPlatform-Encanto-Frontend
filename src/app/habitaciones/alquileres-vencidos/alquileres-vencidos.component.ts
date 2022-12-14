import { Component, OnInit } from '@angular/core';
import { Alquiler } from 'src/app/interfaces/alquiler.interface';
import { ConfirmService } from 'src/app/services/confirm.service';
import { NotifyService } from 'src/app/services/notify.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { AlquilerService } from '../services/alquiler.service';

type ResponseAlquileresVencidosIndex = 'hoy' | 'anteriores'

@Component({
  selector: 'hwp-alquileres-vencidos',
  templateUrl: './alquileres-vencidos.component.html',
  styles: [
  ]
})
export class AlquileresVencidosComponent implements OnInit {

  vencidosHoy: Alquiler[] = []
  vencidosAnteriores: Alquiler[] = []

  paginas = {
    hoy:0,
    anteriores:0
  }
  pagina = {
    hoy: 1,
    anteriores: 1
  }
  total = {
    hoy:0,
    anteriores:0
  }

  isFetching = {
    hoy:true,
    anteriores:true
  }

  paginationRange: {hoy:number[],anteriores:number[]} = {
    hoy: [],
    anteriores: [],
  }
  maxPagesInPaginationBar = 5

  limit = 5

  constructor(
    private alquilerService: AlquilerService,
    private paginationService: PaginationService,
    private confirm: ConfirmService,
    private notify: NotifyService
  ) { }

  ngOnInit(): void {
    this.fetchAlquileresVencidosDeHoy()
    this.fetchAlquileresVencidosAnteriores()
  }

  
  ta(data: any){return data as Alquiler}

  getDateFromData(dateAsString: string){
    return new Date(dateAsString)
  }
  

  paginate(page: number | string, item: 'hoy' | 'anteriores') {

    const { newPaginationRange, newPage } = this.paginationService.paginate({
      page,
      paginationRange: this.paginationRange[item],
      maxPagesInPaginationBar: this.maxPagesInPaginationBar,
      currentPage: this.pagina[item],
      paginas: this.paginas[item]
    })

    if(item === 'hoy'){
      this.paginationRange.hoy = newPaginationRange
      this.pagina.hoy = newPage

      this.fetchAlquileresVencidosDeHoy(false)
      
      return
      
    } else {
      this.paginationRange.anteriores = newPaginationRange
      this.pagina.anteriores = newPage

      this.fetchAlquileresVencidosAnteriores(false)

      return
    }

  }

  onLimitChange(newLimit: EventTarget) {

    this.limit = parseInt(((newLimit as any).value))
    this.pagina['hoy'] = 1
    this.pagina['anteriores'] = 1

    this.fetchAlquileresVencidosDeHoy()
    this.fetchAlquileresVencidosAnteriores()
  }

  fetchAlquileresVencidosDeHoy(forceReload = true) {
    this.isFetching.hoy = true
    this.alquilerService.getAlquileresVencidosHoy(
      { limit: this.limit, offset: this.pagina.hoy-1 } 
    ).subscribe(response => {
      this.isFetching.hoy = false
      if(response.data && response.data.alquileresVencidosHoy.result.length>0 ){
        const data = response.data.alquileresVencidosHoy
        if(forceReload){
          this.paginas.hoy=response.data.alquileresVencidosHoy.pages
          this.paginationRange.hoy = []
          for (let i = 1; i <= data.pages; i++) {
            if (i > this.maxPagesInPaginationBar) break;
            this.paginationRange.hoy.push(i)
          }
        }
        this.vencidosHoy=data.result
        this.total.hoy = data.total
        return
      }
      if(response.errors && response.errors.length > 0){
        this.notify.failure(response.errors[0].message)
        return
      }
      console.log(response)
    })
  }

  fetchAlquileresVencidosAnteriores(forceReload = true) {
    this.isFetching.anteriores = true
    this.alquilerService.getAlquileresVencidosAnteriores(
      { limit: this.limit, offset: this.pagina.anteriores-1 } 
    ).subscribe(response => {
      this.isFetching.anteriores = false
      if(response.data && response.data.alquileresVencidosAnteriores.result.length>0 ){
        const data = response.data.alquileresVencidosAnteriores
        if(forceReload){
          this.paginas.anteriores=response.data.alquileresVencidosAnteriores.pages
          this.paginationRange.anteriores = []
          for (let i = 1; i <= data.pages; i++) {
            if (i > this.maxPagesInPaginationBar) break;
            this.paginationRange.anteriores.push(i)
          }
        }
        this.vencidosAnteriores=data.result
        this.total.anteriores = data.total
        return
      }
      if(response.errors && response.errors.length > 0){
        this.notify.failure(response.errors[0].message)
        return
      }
      console.log(response)
    })
  }

  extendAlquiler(id:string){
    this.confirm.warning({
      title:'Extender alquiler',
      message:'Al extender el alquiler, su fecha de culminación se adelantará un día más, tenga en cuenta que esto aumenta el costo al finalizar el alquiler',
      okText:'Extender',
      onOk:()=>{
        this.actualizarAlquiler(id,'Extension')
      }
    })
  }

  ceaseAlquiler(id:string){
    this.confirm.warning({
      title:'Culminar alquiler',
      message:'Al culminar el alquiler, se procesará el coste final acorde a los días del alquiler, es necesario culminar el alquiler para poder incluir el mismo en los reportes',
      okText:'Culminar',
      onOk:()=>{
        this.actualizarAlquiler(id,'Culminacion')
      }
    })
  }

  actualizarAlquiler(id:string,caso:'Extension' | 'Culminacion'){
    this.alquilerService.actualizarEstadoAlquiler(id,caso)
    .subscribe(response=>{
      if (response.data?.actualizarEstadoAlquiler.id) {
        this.notify.success('El alquiler fue actualizado con exito!, sea para culminación o extensión')
        const isInVencidosAnteriores = this.vencidosAnteriores.filter(alquiler=>alquiler.id === id)
        if(isInVencidosAnteriores.length>0){
          if(this.vencidosAnteriores.length === 1 && this.pagina.anteriores > 1){
            this.paginas.anteriores -= 1
            this.pagina.anteriores -= 1
            this.paginationRange.anteriores.pop()
          } if(this.vencidosAnteriores.length === 1 && this.pagina.anteriores === 1){
            this.vencidosAnteriores = []
          }
          this.paginate(this.pagina.anteriores,'anteriores')
          return
        }
        if(this.vencidosHoy.length === 1 && this.pagina.hoy > 1){
          this.paginas.hoy -= 1
          this.pagina.hoy -= 1
          this.paginationRange.hoy.pop()
        }if(this.vencidosHoy.length === 1 && this.pagina.hoy === 1){
          this.vencidosHoy = []
        }
        this.paginate(this.pagina.hoy,'hoy')
      }
    })
  }

}
