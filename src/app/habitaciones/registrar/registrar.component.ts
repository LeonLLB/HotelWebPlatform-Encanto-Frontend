import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';
import { HabitacionService } from '../services/habitacion.service';

@Component({
  selector: 'hwp-registrar',
  templateUrl: './registrar.component.html',
  styles: [
  ]
})
export class RegistrarComponent implements OnInit {

  invalidInputs = [
    '_id',
    '__typename',
    'estado'
  ]

  isEditableForm = false

  habitacionForm = this.fb.group({
    numero: [null as unknown as number, [Validators.required, Validators.min(1)]],
    piso: [null as unknown as number, [Validators.required, Validators.min(1)]],
    tipo: ['', [Validators.required]],
    caracteristicas: this.fb.array<string>([])
  })
  habitacionId!: string

  extraCaracteristica = this.fb.control('')
  tiposValidos = [
    { icon: 'single_bed', value: 'Singular', label: 'Singular' },
    { icon: 'bed', value: 'Matrimonial', label: 'Matrimonial' },
    { icons: ['single_bed', 'single_bed'], value: 'Doble Singular', label: 'Doble Singular' },
    { icons: ['single_bed', 'bed'], value: 'Singular - Matrimonial', label: 'Singular - Matrimonial' },
  ]
  hasAddedCaracteristica = false;

  constructor(
    private fb: FormBuilder,
    private habitacionService: HabitacionService,
    private notify: NotifyService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  get additionalCaracteristicas() {
    return this.habitacionForm.get('caracteristicas') as FormArray
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(data => {
        if (data['id']) {
          this.isEditableForm = true

          this.habitacionService.getOne(data['id'])
            .subscribe((response) => {
              if(!response.data){
                this.router.navigate(['/main', 'habitaciones'])
                return
              }
              const habitacion = response.data.habitacion
              this.habitacionId = habitacion._id
              let newForm: { [x: string]: any } = {}

              for (let habitacionMap of Object.entries(habitacion)) {
                if (this.invalidInputs.includes(habitacionMap[0])) continue;
                if(habitacionMap[1].constructor.toString().includes('Array')){
                  newForm[habitacionMap[0]] = []
                  for (const caracteristica of habitacionMap[1]) {                    
                    (newForm[habitacionMap[0]] as any[]).push(caracteristica);
                    this.extraCaracteristica.setValue(caracteristica)
                    this.addCaracteristicaToForm()
                  }
                  continue
                }
                newForm[habitacionMap[0]] = habitacionMap[1]
              }

              this.habitacionForm.setValue(newForm as any)
            })
        }
      })
  }

  addCaracteristicaToForm() {

    if (this.extraCaracteristica.invalid) return;
    this.hasAddedCaracteristica = true

    this.additionalCaracteristicas.push(this.fb.control(this.extraCaracteristica.value, [Validators.required]))

    this.extraCaracteristica.reset()
  }

  deleteInputFromArr(i: number) {
    this.additionalCaracteristicas.removeAt(i)

    if (this.additionalCaracteristicas.length === 0) this.hasAddedCaracteristica = false
  }

  registerHabitacionSubmit() {
    if (this.habitacionForm.invalid) {
      this.habitacionForm.markAllAsTouched()
      return;
    }

    if(this.isEditableForm){
      this.habitacionService.update(this.habitacionForm, this.habitacionId)
      .subscribe(response => {
        if (response.data?.updateHabitacion._id) {
          this.notify.success('Habitación modificada y actualizada con exito!')
          this.router.navigate(['/main', 'habitaciones'])
        }
      })
      return
    }

    this.habitacionService.create(this.habitacionForm)
      .subscribe(response => {
        if (response.data?.createHabitacion._id) {
          this.notify.success('Habitación creada con exito!')
          this.router.navigate(['/main', 'habitaciones'])
        }
      })
  }

}
