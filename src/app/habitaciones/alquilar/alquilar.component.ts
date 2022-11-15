import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlquilerFormData, ClienteFormData, InvitadosFormData } from 'src/app/interfaces/alquiler.interface';
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
    telefono:['',[Validators.required, (this.validatorsService.venezuelanNumber())]],
  })
  invitadosForm = this.fb.group({
    nombre: this.fb.array<string>([]),
    apellido: this.fb.array<string>([]),
    cedula: this.fb.array<number>([]),
    telefono: this.fb.array<string>([]),
  })

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

    this.hasAddedInvitado = true

    this.additionalNombres.push(this.fb.control('', [Validators.required]))
    this.additionalApellidos.push(this.fb.control('', [Validators.required]))
    this.additionalCedulas.push(this.fb.control('' as unknown as Number, [Validators.required]))
    this.additionalTelefonos.push(this.fb.control('', [Validators.required, this.validatorsService.venezuelanNumber]))

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

  alquilerSubmit(){

    if (this.alquilerForm.invalid || this.invitadosForm.invalid || this.clientePrincipalForm.invalid) {
      this.alquilerForm.markAllAsTouched()
      this.clientePrincipalForm.markAllAsTouched()
      this.invitadosForm.markAllAsTouched()
      return;
    }
    //TODO ACTUALIZACION
    // if(this.isEditableForm){
    //   this.habitacionService.update(this.habitacionForm, this.habitacionId)
    //   .subscribe(response => {
    //     if (response.data?.updateHabitacion._id) {
    //       this.notify.success('Habitación modificada y actualizada con exito!')
    //       this.router.navigate(['/main', 'habitaciones'])
    //     }
    //   })
    //   return
    // }
    
      const  data = this.alquilerService.generateAlquilerDataFromFormGroups(
        this.alquilerForm.value as AlquilerFormData,
        this.clientePrincipalForm.value as ClienteFormData,
        this.invitadosForm.value as InvitadosFormData,
      )

    this.alquilerService.alquilar(data)
      .subscribe(response => {
        if (response.data?.alquilar._id) {
          this.notify.success('Habitación alquilada con exito!')
          this.router.navigate(['/main', 'habitaciones','reservar'])
        }
      })
  }

}
