import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/interfaces/proveedor.interface';
import { ConfirmService } from 'src/app/services/confirm.service';
import { NotifyService } from 'src/app/services/notify.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { ReportService } from 'src/app/services/report.service';
import { ProveedorService } from '../services/proveedor.service';

@Component({
  selector: 'hwp-consultar',
  templateUrl: './consultar.component.html',
  styles: [
  ]
})
export class ConsultarComponent implements OnInit {
 
  proveedores: Proveedor[] = []
  paginas!: number
  pagina: number = 1
  total!: number
  isFetching = true

  paginationRange: number[] = []
  maxPagesInPaginationBar = 5

  limit = 5

  constructor(
    private proveedoresService: ProveedorService,
    private paginationService: PaginationService,
    private confirm: ConfirmService,
    private report: ReportService,
    private notify: NotifyService
  ) { }

  ngOnInit(): void {
    this.fetchProveedores()
  }

  tp(data:any){
    return data as Proveedor
  } 

  displayUbicacion({direccion}:Proveedor){
    this.report.info('Ubicación',direccion,true)
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

    this.fetchProveedores(false)

  }

  onLimitChange(newLimit: EventTarget) {

    this.limit = ((newLimit as any).value)
    this.pagina = 1

    this.fetchProveedores()
  }

  fetchProveedores(forceReload = true){
    this.isFetching=true
    this.proveedoresService.getAll(
      this.limit,
      this.pagina-1
    )
    .subscribe(response=>{
      this.isFetching=false
      if(response.data && response.data.proveedores.result.length>0 ){
        const data = response.data.proveedores
        if(forceReload){
          this.paginas=data.pages
          this.paginationRange = []
          for (let i = 1; i <= data.pages; i++) {
            if (i > this.maxPagesInPaginationBar) break;
            this.paginationRange.push(i)
          }
        }
        this.proveedores=data.result
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

  eliminarProveedor({_id,nombre}: Proveedor){
    this.confirm.danger({
      title:'Eliminar proveedor: ' + nombre,
      message:'Esta seguro de querer eliminar este proveedor? Tenga en cuenta que eliminar este proveedor tambien eliminará todas las compras hechos al mismo',
      okText:'Eliminar',
      onOk:()=>{
        this.proveedoresService.delete(_id)
        .subscribe((response)=>{
          if (response.data?.removeProveedor._id) {
            this.notify.success('Proveedor eliminado con exito!')
            if(this.proveedores.length === 1 && this.pagina > 1){
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
