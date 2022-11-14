import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Habitacion } from 'src/app/interfaces/habitacion.interface';
import { HabitacionService } from '../services/habitacion.service';

@Component({
  selector: 'hwp-alquilar',
  templateUrl: './alquilar.component.html',
  styles: [
  ]
})
export class AlquilarComponent implements OnInit {

  habitacionData!: Habitacion
  isLoading = true
  isEditableForm = false
  alquilerForm = this.fb.group({
    habitacion:['',Validators.required],
    costoDolar:[Number(undefined),Validators.required],
    fechaInicio:[this.todaysDate,[Validators.required]],
    fechaFin:[this.tomorrowsDate,[Validators.required]],
    procedencia:['',Validators.required],
  })  
  clientePrincipalForm = this.fb.group({})
  invidatesForm = this.fb.group({})

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private habitacionService: HabitacionService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const habitacionId = params['habitacionId']
      this.alquilerForm.controls.habitacion.setValue(habitacionId)
      this.getHabitacionData(habitacionId)
      // this.isLoading=false
    })
  }

  getHabitacionData(habitacionId: string){
    this.isLoading=true
    this.habitacionService.getSimpleOne(habitacionId).subscribe(response=>{
      this.habitacionData = response.data.habitacion
      this.isLoading=false
    })
  }

  get todaysDate() :string{
    const date = new Date()
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  }

  get tomorrowsDate() :string{
    const date = new Date()
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()+1}`
  }

  // get fechaFinDateFromForm(): string {
  //   const date = new Date(this.alquilerForm.value.fechaFin!)
  //   return 
  // }

  alquilerSubmit(){}

}
