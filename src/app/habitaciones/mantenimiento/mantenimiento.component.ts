import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock } from 'src/app/interfaces/stock.interface';
import { StockService } from 'src/app/inventario/services/stock.service';
import { NotifyService } from 'src/app/services/notify.service';
import { HabitacionService } from '../services/habitacion.service';

@Component({
  selector: 'hwp-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styles: [
  ]
})
export class MantenimientoComponent implements OnInit {

  mantenimientoForm = this.fb.group({
    cantidades:this.fb.array<number>([],[Validators.required])
  })

  stocks: Stock[] = []

  isFetching = true

  habitacionId! : string

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notify: NotifyService,
    private stockService: StockService,
    private habitacionService: HabitacionService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.habitacionId=params['id']
      this.preloadData()
    })
  }

  preloadData(){
    this.isFetching=true
    this.stockService.getNonPaginatedStocks().subscribe(response=>{
      this.isFetching=false
      if(response.data && response.data.stocks.result.length > 0){
        this.stocks = response.data.stocks.result
        response.data.stocks.result.forEach(stock=>{
          this.addCantidad(stock.stockActual)
        })
        return
      }
      this.router.navigate(['/main','habitaciones',this.habitacionId])
      this.notify.failure('Se necesitan articulos para poder llevar a cabo el mantenimiento')
    })
  }

  private addCantidad(stockMaximo:number){
    this.additionalCantidades.push(this.fb.control(0, [Validators.required,Validators.min(0),Validators.max(stockMaximo)]))
  }

  get additionalCantidades(): FormArray{
    return this.mantenimientoForm.controls.cantidades as FormArray
  }

  mantenimientoSubmit(){
    if(this.mantenimientoForm.invalid){
      this.mantenimientoForm.markAllAsTouched()
      return
    }


  }

}
