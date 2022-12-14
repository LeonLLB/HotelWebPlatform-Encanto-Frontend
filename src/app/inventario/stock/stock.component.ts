import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/interfaces/stock.interface';
import { ConfirmService } from 'src/app/services/confirm.service';
import { NotifyService } from 'src/app/services/notify.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'hwp-stock',
  templateUrl: './stock.component.html',
  styles: [
  ]
})
export class StockComponent implements OnInit {

  stocks: Stock[] = []
  paginas!: number
  pagina: number = 1
  total!: number

  isFetching = true

  paginationRange: number[] = []
  maxPagesInPaginationBar = 5

  limit = 5
 
  constructor(
    private stockService: StockService,
    private paginationService: PaginationService,
    private confirm: ConfirmService,
    private notify: NotifyService
  ) { }

  ngOnInit(): void {
    this.fetchStock()
  }  

  ts(data:any){
    return data as Stock
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

    this.fetchStock(false)

  }  

  onLimitChange(newLimit: EventTarget) {

    this.limit = ((newLimit as any).value)
    this.pagina = 1

    this.fetchStock()
  }

  fetchStock(forceReload = true){
    this.isFetching=true
    this.stockService.getStocks({
      limit:this.limit,
      offset:this.pagina-1
    })
    .subscribe(response=>{
      this.isFetching=false
      if(response.data && response.data.stocks.result.length>0 ){
        const data = response.data.stocks
        if(forceReload){
          this.paginas=response.data.stocks.pages
          this.paginationRange = []
          for (let i = 1; i <= data.pages; i++) {
            if (i > this.maxPagesInPaginationBar) break;
            this.paginationRange.push(i)
          }
        }
        this.stocks=data.result
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

  async updateStock({articulo:{id},stockActual}: Stock){
    const extractedValue = await this.confirm.asyncPrompt({
      title:'Cambiar stock',
      message:'Nuevo stock de archivo',
      promptDefaultText:`${stockActual}`,
      okText:'Actualizar'
    })

    if(!extractedValue) return
    const rawValue = extractedValue.replaceAll(',','.')
    if(isNaN(+rawValue)){
      this.notify.failure('El stock enviado no es valido')
      return
    }

    const value = +((+rawValue).toPrecision(1))

    if(value<0){
      this.notify.failure('El stock enviado debe ser mayor o igual a 0')
      return
    }

    if(await this.confirm.asyncWarning({
      title:'Cambiar el stock',
      message:'Estas seguro de queres cambiar el stock de esta manera?, sin compra que la respalde solo afectará la existencia',
      okText:'Cambiar'
    })){
      this.stockService.changeStock(value,id).subscribe(response=>{
        if (response.data?.updateStock.id) {
          this.notify.success('Stock cambiado con exito!')          
          this.paginate(this.pagina)
        }
      })
    }
  }

}
