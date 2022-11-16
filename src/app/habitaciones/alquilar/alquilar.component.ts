import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alquiler, AlquilerFormData, Cliente, ClienteFormData, InvitadosFormData } from 'src/app/interfaces/alquiler.interface';
import { Habitacion } from 'src/app/interfaces/habitacion.interface';
import { NotifyService } from 'src/app/services/notify.service';
import { ValidatorService } from 'src/app/services/validator.service';
import { AlquilerService } from '../services/alquiler.service';
import { HabitacionService } from '../services/habitacion.service';

@Component({
  selector: 'hwp-alquilar',
  templateUrl: './alquilar.component.html',
  styles: [
  ]
})
export class AlquilarComponent implements OnInit {

  habitacionesData: Habitacion[] = [];
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private habitacionService: HabitacionService,
    private alquilerService: AlquilerService,
    private validatorsService: ValidatorService,
    private notify: NotifyService,
    private router: Router
  ) { }    

  habitacionData!: Habitacion
  isLoading = true
  isEditableForm = false
  alquilerId!: string
  alquilerForm = this.fb.group({
    habitacion: ['', Validators.required],
    costoDolar: [Number(undefined), Validators.required],
    fechaInicio: [this.todaysDate, [Validators.required]],
    fechaFin: [this.tomorrowsDate, [Validators.required]],
    procedencia: ['', Validators.required],
  })
  clientePrincipalForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    cedula: [Number(undefined), Validators.required],
    telefono: ['', [Validators.required, (this.validatorsService.venezuelanNumber())]],
  })
  invitadosForm = this.fb.group({
    nombre: this.fb.array<string>([]),
    apellido: this.fb.array<string>([]),
    cedula: this.fb.array<number>([]),
    telefono: this.fb.array<string>([]),
  })
  conditionForm = this.fb.group({
    condition:['Datos',Validators.required]
  })

  hasAddedInvitado = false

  conditionInputs = [
    {value:'Error',label:'Por error'},
    {value:'Datos',label:'Datos equivocados'},
    {value:'Traslado',label:'Por traslado'},
  ]

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

  get HabitacionesIntoSelectData(){
    return this.habitacionesData.map(habitacion=>({
      value:habitacion._id,
      label:`Habitación N° ${habitacion.numero}`
    }))
  }


  private getAdditionalArrayInput(caso: 'nombre' | 'apellido' | 'cedula' | 'telefono'): FormArray {
    return this.invitadosForm.get(caso) as FormArray
  }

  addInvitadoToForm(defaultInvitado: (Cliente | undefined) = undefined) {

    this.hasAddedInvitado = true

    this.additionalNombres.push(this.fb.control(defaultInvitado?.nombre ?? '', [Validators.required]))
    this.additionalApellidos.push(this.fb.control(defaultInvitado?.apellido ?? '', [Validators.required]))
    this.additionalCedulas.push(this.fb.control(defaultInvitado?.cedula ?? '' as unknown as Number, [Validators.required]))
    this.additionalTelefonos.push(this.fb.control(defaultInvitado?.telefono ?? '', [Validators.required, this.validatorsService.venezuelanNumber]))

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
    ) { this.hasAddedInvitado = false }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const habitacionId = params['habitacionId']
      if (habitacionId) {
        this.alquilerForm.controls.habitacion.setValue(habitacionId)
        this.getHabitacionData(habitacionId)
        return
      }
      if (params['id']) {
        this.isLoading = true
        this.alquilerService.fetchAlquiler(params['id'])
        .subscribe(response => {
          if (response.data && response.data.alquiler) {
              this.alquilerId = params['id']
              this.isLoading = false
              this.isEditableForm = true
              this.preloadForm(response.data.alquiler)
              this.getHabitacionesData()
              return
            }
            this.router.navigate(['/main', 'habitaciones', 'alquileres'])
          })
      }
      // this.isLoading=false
    })
  }

  preloadForm(data: Alquiler) {
    this.habitacionData = data.habitacion

    //RELLENAR ALQUILER
    this.alquilerForm.setValue({
      habitacion:data.habitacion._id,
      costoDolar:data.costoDolar,
      procedencia:data.procedencia,
      fechaFin:this.formatDateFromNumber(data.fechaFin),
      fechaInicio:this.formatDateFromNumber(data.fechaInicio),
    })

    //RELLENAR CLIENTE PRINCIPAL
    this.clientePrincipalForm.setValue({
      nombre:data.clientePrincipal.nombre,
      apellido:data.clientePrincipal.apellido,
      cedula:data.clientePrincipal.cedula,
      telefono:data.clientePrincipal.telefono as any,
    })

    //RELLENAR INVITADOS

    if(data.clientesSecundarios){
      for(const invitado of data.clientesSecundarios){
        this.addInvitadoToForm(invitado)
      }      
    }

  }

  getHabitacionData(habitacionId: string) {
    this.isLoading = true
    this.habitacionService.getSimpleOne(habitacionId).subscribe(response => {
      this.habitacionData = response.data.habitacion
      this.isLoading = false
    })
  }

  getHabitacionesData() {
    this.isLoading = true
    this.habitacionService.getSimpleOnes().subscribe(response => {
      this.habitacionesData = response.data.habitaciones.result
      this.isLoading = false
    })
  }

  get isMotiveDatos():boolean{
    return this.conditionForm.value.condition === 'Datos'
  }
  
  private formatDateFromDate(date:Date):string{
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  private formatDateFromNumber(dateString:string):string{
    const date = new Date(+dateString)
    return this.formatDateFromDate(date)
  }
  
  get todaysDate(): string {
    return this.formatDateFromDate(new Date)
  }
  
  get tomorrowsDate(): string {
    const date = new Date()
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`
  }
  
  alquilerSubmit() {

    if (this.alquilerForm.invalid || this.invitadosForm.invalid || this.clientePrincipalForm.invalid) {
      this.alquilerForm.markAllAsTouched()
      this.clientePrincipalForm.markAllAsTouched()
      this.invitadosForm.markAllAsTouched()
      return;
    }

    const data = this.alquilerService.generateAlquilerDataFromFormGroups(
      this.alquilerForm.value as AlquilerFormData,
      this.clientePrincipalForm.value as unknown as ClienteFormData,
      this.invitadosForm.value as InvitadosFormData,
    )

    if(this.isEditableForm){

      if(this.conditionForm.value.condition === 'Datos'){
        this.alquilerForm.controls.habitacion.setValue(this.habitacionData._id)
      }

      this.alquilerService.update(data, this.conditionForm.value.condition as any,this.alquilerId )
      .subscribe(response => {
        if (response.data?.updateAlquiler._id) {
          this.notify.success('Alquiler modificado y actualizado con exito!')
          this.router.navigate(['/main', 'habitaciones','alquileres'])
        }
      })
      return
    }   

    this.alquilerService.alquilar(data)
      .subscribe(response => {
        if (response.data?.alquilar._id) {
          this.notify.success('Habitación alquilada con exito!')
          this.router.navigate(['/main', 'habitaciones', 'reservar'])
        }
      })
  }

}
