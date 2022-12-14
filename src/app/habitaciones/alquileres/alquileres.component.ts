import { Component, OnInit } from '@angular/core';
import { Alquiler } from 'src/app/interfaces/alquiler.interface';
import { ValidRoles } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmService } from 'src/app/services/confirm.service';
import { NotifyService } from 'src/app/services/notify.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { AlquilerService } from '../services/alquiler.service';

@Component({
  selector: 'hwp-alquileres',
  templateUrl: './alquileres.component.html',
  styles: [
  ]
})
export class AlquileresComponent implements OnInit {

  alquileres: Alquiler[] = []
  paginas!: number
  pagina: number = 1
  total!: number
  isFetching = true

  paginationRange: number[] = []
  maxPagesInPaginationBar = 5

  limit = 5

  constructor(
    private alquilerService: AlquilerService,
    private paginationService: PaginationService,
    private notify: NotifyService,
    private confirm:ConfirmService,
    private auth: AuthService
  ) { }

  get isAdmin(): boolean {return this.auth.rol === ValidRoles.admin}
  
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

    this.fetchAlquileres(false)

  }

  onLimitChange(newLimit: EventTarget) {

    this.limit = ((newLimit as any).value)
    this.pagina = 1

    this.fetchAlquileres()
  }

  ngOnInit(): void {
    this.fetchAlquileres()
  }

  ta(data: any){return data as Alquiler}

  getDateFromData(dateAsString: string){
    return new Date(dateAsString)
  }
  
  fetchAlquileres(fullReload = true){
    this.isFetching =  true
    this.alquilerService.fetchPaginated({limit:5,offset:0})
    .subscribe(response=>{
      this.isFetching = false
      if(response.data && response.data.alquileres.result.length>0 ){
        const data = response.data.alquileres
        if(fullReload){
          this.paginas=response.data.alquileres.pages
          this.paginationRange = []
          for (let i = 1; i <= data.pages; i++) {
            if (i > this.maxPagesInPaginationBar) break;
            this.paginationRange.push(i)
          }
        }
        this.alquileres=data.result
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

  eliminarAlquiler({id}: Alquiler){
    this.confirm.danger({
      title:'Eliminar Alquiler',
      message:'Esta seguro de querer eliminar este alquiler? Tenga en cuenta que al eliminar este alquiler la habitaci??n volvera a estar disponible, como si no hubiera sido usada, en caso de culminaci??n de alquiler, dirigirse a "Culminar" ',
      okText:'Eliminar',
      onOk:()=>{
        this.alquilerService.delete(id)
        .subscribe((response)=>{
          if (response.data?.eliminarAlquiler.id) {
            this.notify.success('Alquiler eliminado con exito!')
            if(this.alquileres.length === 1 && this.pagina > 1){
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
