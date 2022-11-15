import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Habitacion } from 'src/app/interfaces/habitacion.interface';
import { ValidatorService } from 'src/app/services/validator.service';
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
  clientePrincipalForm = this.fb.group({
    nombre:['',Validators.required],
    apellido:['',Validators.required],
    cedula:[Number(undefined),Validators.required],
    telefono:['',[Validators.required, this.validatorsService.venezuelanNumber]],
  })
  invitadosForm = this.fb.group({
    nombre: this.fb.array<string>([]),
    apellido: this.fb.array<string>([]),
    cedula: this.fb.array<number>([]),
    telefono: this.fb.array<string>([]),
  })

  extraNombre = this.fb.control('')
  extraApellido = this.fb.control('')
  extraCedula = this.fb.control(Number(undefined))
  extraTelefono = this.fb.control('')
  hasAddedInvitado = false

  
  get additionalNombres() {
    return this.getAdditionalArrayInput('nombre')
  }

  get additionalApellidos() {
    return this.getAdditionalArrayInput('apellido')
  }
  
  get additionalCedulas() {
    return this.getAdditionalArrayInput('cedula')
  }
  
  get additionalTelefonos() {
    return this.getAdditionalArrayInput('telefono')
  }
  
  
  private getAdditionalArrayInput(caso: 'nombre' | 'apellido' | 'cedula' | 'telefono') : FormArray{
    return this.invitadosForm.get(caso) as FormArray
  }

  addInvitadoToForm() {

    if ( this.extraNombre.invalid || this.extraApellido.invalid || this.extraCedula.invalid || this.extraTelefono.invalid) return;
    this.hasAddedInvitado = true

    this.additionalNombres.push(this.fb.control(this.extraNombre.value, [Validators.required]))
    this.additionalApellidos.push(this.fb.control(this.extraApellido.value, [Validators.required]))
    this.additionalCedulas.push(this.fb.control(this.extraCedula.value, [Validators.required]))
    this.additionalTelefonos.push(this.fb.control(this.extraTelefono.value, [Validators.required, this.validatorsService.venezuelanNumber]))

    this.additionalNombres.reset()
    this.additionalApellidos.reset()
    this.additionalCedulas.reset()
    this.additionalTelefonos.reset()
  }

  deleteInputFromArr(i: number) {
    this.additionalNombres.removeAt(i)
    this.additionalApellidos.removeAt(i)
    this.additionalCedulas.removeAt(i)
    this.additionalTelefonos.removeAt(i)

    if (
      this.additionalNombres.length === 0 &&
      this.additionalApellidos.length === 0 &&
      this.additionalCedulas.length === 0 &&
      this.additionalTelefonos.length === 0 
    ) {this.hasAddedInvitado = false}
  }

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private habitacionService: HabitacionService,
    private validatorsService: ValidatorService
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
