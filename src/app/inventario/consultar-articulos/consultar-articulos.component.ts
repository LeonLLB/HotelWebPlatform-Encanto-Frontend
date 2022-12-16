import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/interfaces/articulo.interface';
import { ConfirmService } from 'src/app/services/confirm.service';
import { NotifyService } from 'src/app/services/notify.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { ArticuloService } from '../services/articulo.service';

@Component({
  selector: 'hwp-consultar-articulos',
  templateUrl: './consultar-articulos.component.html',
  styles: [
  ]
})
export class ConsultarArticulosComponent implements OnInit {

  isFetching = {
    limpieza: true,
    lenceria: true,
  }

  articulos: { limpieza: Articulo[], lenceria: Articulo[] } = {
    limpieza: [],
    lenceria: []
  }

  limit = {
    limpieza: 5,
    lenceria: 5
  }

  pagina = {
    limpieza: 1,
    lenceria: 1
  }

  paginas = {
    limpieza:0,
    lenceria:0
  }
  total = {
    limpieza:0,
    lenceria:0
  }

  paginationRange: { limpieza: number[], lenceria: number[] } = { limpieza: [], lenceria: [] }
  maxPagesInPaginationBar = 5

  constructor(
    private paginationService: PaginationService,
    private notify: NotifyService,
    private confirm: ConfirmService,
    private articuloService: ArticuloService
  ) { }

  paginate(page: number | string, type: 'lenceria' | 'limpieza') {

    if (type === 'lenceria') {
      const { newPaginationRange, newPage } = this.paginationService.paginate({
        page,
        paginationRange: this.paginationRange.lenceria,
        maxPagesInPaginationBar: this.maxPagesInPaginationBar,
        currentPage: this.pagina.lenceria,
        paginas: this.paginas.lenceria
      })

      this.paginationRange.lenceria = newPaginationRange
      this.pagina.lenceria = newPage

      this.fetchLenceria(false)
      return
    }

    const { newPaginationRange, newPage } = this.paginationService.paginate({
      page,
      paginationRange: this.paginationRange.limpieza,
      maxPagesInPaginationBar: this.maxPagesInPaginationBar,
      currentPage: this.pagina.limpieza,
      paginas: this.paginas.limpieza
    })

    this.paginationRange.limpieza = newPaginationRange
    this.pagina.limpieza = newPage

    this.fetchLimpieza(false)

  }

  onLimitChange(newLimit: EventTarget, type: 'limpieza' | 'lenceria') {
    if (type === 'lenceria') {
      this.limit.lenceria = +((newLimit as any).value)
      this.pagina.lenceria = 1

      this.fetchLenceria()
      return
    }
    this.limit.limpieza = +((newLimit as any).value)
    this.pagina.limpieza = 1

    this.fetchLimpieza()
  }

  ngOnInit(): void {
    this.fetchLimpieza()
    this.fetchLenceria()
  }

  fetchLimpieza(fullreload = true) {
    this.isFetching.limpieza=true
    this.articuloService.getLimpieza(this.limit.limpieza,this.pagina.limpieza)
      .subscribe(response => {
        this.isFetching.limpieza = false
        if (response.data && response.data?.articulos?.result.length > 0) {
          const data = response.data.articulos
          if (fullreload) {
            this.paginas.limpieza = data.pages
            this.paginationRange.limpieza = []
            for (let i = 1; i <= data.pages; i++) {
              if (i > this.maxPagesInPaginationBar) break;
              this.paginationRange.limpieza.push(i)
            }
          }
          this.articulos.limpieza = data.result
          this.total.limpieza = data.total
          return
        }
        if (response.errors && response.errors.length > 0) {
          this.notify.failure(response.errors[0].message)
          return
        }
        // console.log(response)
      })
  }

  fetchLenceria(fullreload = true) {
    this.isFetching.lenceria=true
    this.articuloService.getLenceria(this.limit.lenceria,this.pagina.lenceria)
      .subscribe(response => {
        this.isFetching.lenceria = false
        if (response.data && response.data.articulos?.result.length > 0) {
          const data = response.data.articulos
          if (fullreload) {
            this.paginas.lenceria = data.pages
            this.paginationRange.lenceria = []
            for (let i = 1; i <= data.pages; i++) {
              if (i > this.maxPagesInPaginationBar) break;
              this.paginationRange.lenceria.push(i)
            }
          }
          this.articulos.lenceria = data.result
          this.total.lenceria = data.total
          return
        }
        if (response.errors && response.errors.length > 0) {
          this.notify.failure(response.errors[0].message)
          return
        }
        // console.log(response)
      })
  }

  eliminarArticulo({id,nombre,tipo}: Articulo){
    this.confirm.danger({
      title:'Eliminar producto: ' + nombre,
      message:'Esta seguro de querer eliminar este producto? Tenga en cuenta que eliminar este producto tambien eliminará los registros de compras donde se incluya',
      okText:'Eliminar',
      onOk:()=>{
        this.articuloService.delete(id)
        .subscribe((response)=>{
          if (response.data?.removeArticulo.id) {
            this.notify.success('Producto eliminado con exito!')
            this.postDelete(tipo)
          }
        })
      }
    })
  }

  private postDelete(tipo:string){
    if(tipo === 'Lenceria'){
      if(this.articulos.lenceria.length === 1 && this.pagina.lenceria > 1){
        this.paginas.lenceria -= 1
        this.pagina.lenceria -= 1
        this.paginationRange.lenceria.pop()
      }
      this.paginate(this.pagina.lenceria, 'lenceria')
      return
    }
    if(this.articulos.limpieza.length === 1 && this.pagina.limpieza > 1){
      this.paginas.limpieza -= 1
      this.pagina.limpieza -= 1
      this.paginationRange.limpieza.pop()
    }
    this.paginate(this.pagina.limpieza,'limpieza')
  }

}
