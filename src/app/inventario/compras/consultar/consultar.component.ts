import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { getMonthsOfYear } from 'src/app/helpers/getYearsMonths.helper';
import { Compra } from 'src/app/interfaces/compra.interface';
import { ProveedorService } from 'src/app/proveedores/services/proveedor.service';
import { ConfirmService } from 'src/app/services/confirm.service';
import { NotifyService } from 'src/app/services/notify.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { ReportService } from 'src/app/services/report.service';
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
  isFetchingProveedores = true
  proveedoresSelect: {label:string,value:string}[] = []

  paginationRange: number[] = []
  maxPagesInPaginationBar = 5

  limit = 5

  filterForm = this.fb.group({
    proveedor: '',
    mes: new Date().getMonth()+1,
    anio: new Date().getFullYear(),
  })

  constructor(
    private comprasService: ComprasService,
    private proveedoresService: ProveedorService,
    private paginationService: PaginationService,
    private fb: FormBuilder,
    private confirm: ConfirmService,
    private report: ReportService,
    private notify: NotifyService
  ) { }

  ngOnInit(): void {
    this.fetchCompras()
    this.fetchProveedores()
  }

  get mesesDelAnio(): {value:string,label:string}[] {
    return getMonthsOfYear().map(mes=>({value:''+mes.monthNum,label:mes.monthName}))
  }

  get aniosValidos(): {value:string,label:string}[] {
    const data : {value:string,label:string}[] = []
    for (let anio = 2017; anio <= new Date().getFullYear(); anio++) {
      const anioEnString = anio.toString()
      data.push({label:anioEnString,value:anioEnString});      
    }
    return data
  }

  tc(data:any){
    return data as Compra
  }

  fetchProveedores(){
    this.isFetchingProveedores = true
    this.proveedoresService.getAllCore()
    .subscribe(result=>{
      this.isFetchingProveedores = false
      if(result.data && result.data.proveedores.result.length > 0){
        result.data.proveedores.result.forEach(proveedor=>{
          this.proveedoresSelect.push({label:proveedor.nombre,value:proveedor.id})
        })
      }
    })
  }

  showArticulosComprados({articulosComprados}:Compra){
    let messageArr: string[] = articulosComprados
    .map(({articulo,cantidad},index) => {
      if(index === 0){
        return `<ul class="list-disc ml-6"><li class="list-disc">${articulo.nombre}: ${cantidad} Unidades</li>`
      }
      if (index === articulosComprados.length -1){
        return `<li class="list-disc">${articulo}: ${cantidad} Unidades</li></ul>`
      }
      return `<li class="list-disc">${articulo}: ${cantidad} Unidades</li>`
    })    

    messageArr.unshift('<span class="text-xl">Cantidad de articulos</span><div class="w-full flex flex-col items-end">')   
    
    this.report.info('Articulos comprados',messageArr.join(''))
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
      filterData:{
        anio: +this.filterForm.value.anio!,
        mes: +this.filterForm.value.mes!,
        proveedor: this.filterForm.value.proveedor!,
      }
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
      // console.log(response)
    })
  }

  eliminarCompra({id}: Compra){
    this.confirm.danger({
      title:'Eliminar Compra',
      message:'Esta seguro de querer eliminar está compra? El inventario reducirá todos los articulos que tenian esta compra. Está acción es irrecuperable',
      okText:'Eliminar',
      onOk:()=>{
        this.comprasService.delete(id)
        .subscribe((response)=>{
          if (response.data?.removeCompra.id) {
            this.notify.success('Compra eliminada con exito!')
            if(this.compras.length === 1 && this.pagina > 1){
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
