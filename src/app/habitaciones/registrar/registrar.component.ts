import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';
import { HabitacionService } from '../services/habitacion.service';

@Component({
  selector: 'hwp-registrar',
  templateUrl: './registrar.component.html',
  styles: [
  ]
})
export class RegistrarComponent implements OnInit {

  isEditableForm = false

  habitacionForm = this.fb.group({
    numero: [null as unknown as number, [Validators.required, Validators.min(1)]],
    piso: [null as unknown as number, [Validators.required, Validators.min(1)]],
    tipo: ['', [Validators.required]],
    caracteristicas: this.fb.array<string>([])
  })

  extraCaracteristica = this.fb.control('')
  tiposValidos = [
    {icon: 'single_bed',value: 'Singular', label: 'Singular'},
    {icon: 'bed',value: 'Matrimonial', label: 'Matrimonial'},
    {icons: ['single_bed','single_bed'],value: 'Doble Singular', label: 'Doble Singular'},
    {icons: ['single_bed','bed'],value: 'Singular - Matrimonial', label: 'Singular - Matrimonial'},
  ]
  hasAddedCaracteristica = false;

  constructor(
    private fb: FormBuilder,
    private habitacionService: HabitacionService,
    private notify: NotifyService,
    private router: Router
  ) { }

  get additionalCaracteristicas() {
    return this.habitacionForm.get('caracteristicas') as FormArray
  }

  ngOnInit(): void {
  }

  addCaracteristicaToForm(){
    
    if( this.extraCaracteristica.invalid ) return;
    this.hasAddedCaracteristica = true

    this.additionalCaracteristicas.push(this.fb.control(this.extraCaracteristica.value,[Validators.required]))

    this.extraCaracteristica.reset()
  }

  deleteInputFromArr(i: number){
    this.additionalCaracteristicas.removeAt(i)

    if(this.additionalCaracteristicas.length === 0) this.hasAddedCaracteristica = false 
  }

  registerHabitacionSubmit() {
    if(this.habitacionForm.invalid){
      this.habitacionForm.markAllAsTouched()
      return;
    }

    // if(this.isEditableForm){
    //   this.userService.updateUser(this.habitacionForm, this.userId)
    //   return
    // }

    this.habitacionService.create(this.habitacionForm)
    .subscribe(response=>{
      if(response.data?.createHabitacion._id){
        this.notify.success('Habitación creada con exito!')
        this.router.navigate(['/main','habitaciones'])
      }
    })
  }

}
