import { Component, OnInit } from '@angular/core';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'hwp-reporte-stock',
  templateUrl: './reporte-stock.component.html',
  styles: [
  ]
})
export class ReporteStockComponent implements OnInit {

  constructor(
    private stockService: StockService
  ) { }

  mes!: string
  year!:string

  months = [
    {label:'Enero',value:'1'},
    {label:'Febrero',value:'2'},
    {label:'Marzo',value:'3'},
    {label:'Abril',value:'4'},
    {label:'Mayo',value:'5'},
    {label:'Julio',value:'6'},
    {label:'Junio',value:'7'},
    {label:'Agosto',value:'8'},
    {label:'Septiembre',value:'9'},
    {label:'Octubre',value:'10'},
    {label:'Noviembre',value:'11'},
    {label:'Diciembre',value:'12'},
  ]

  get years(): ({label:string,value:string})[] {
    const arr = []
    const actualYear = new Date().getFullYear()
    for (let i = 2017; i <= actualYear; i++) {
      arr.push({label:i.toString(),value:i.toString()});      
    }
    return arr
  }

  ngOnInit(): void {
  }

  generate(){
    this.stockService.generarReporteStock(this.mes,this.year)
  }

}
