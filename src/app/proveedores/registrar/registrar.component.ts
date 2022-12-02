import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorInput } from 'src/app/interfaces/proveedor.interface';
import { NotifyService } from 'src/app/services/notify.service';
import { ValidatorService } from 'src/app/services/validator.service';
import { ProveedorService } from '../services/proveedor.service';

@Component({
  selector: 'hwp-registrar',
  templateUrl: './registrar.component.html',
  styles: [
  ]
})
export class RegistrarComponent implements OnInit {

  empresaForm = this.fb.group({
    nombre: ['', Validators.required],
    rif:[Number(undefined), Validators.required],
    direccion:['',Validators.required]
  })
  contactoForm = this.fb.group({
    nombre:['',Validators.required],
    apellido:['',Validators.required],
    telefono:['',[Validators.required,this.validators.venezuelanNumber]]
  })

  isEditableForm = false

  constructor(
    private fb: FormBuilder,
    private proveedorService:ProveedorService,
    private router: Router,
    private route: ActivatedRoute,
    private validators: ValidatorService,
    private notify: NotifyService
  ) { }

  ngOnInit(): void {
  }

  registerSubmit(){
    if(this.contactoForm.invalid || this.empresaForm.invalid){
      this.contactoForm.markAllAsTouched()
      this.empresaForm.markAllAsTouched()
      return
    }

    const data: ProveedorInput = {
      ...this.empresaForm.value as any,
      contacto: {...this.contactoForm.value as any}
    }

    if(this.isEditableForm){
      //TODO: LOGICA DE ACTUALIZACION

      return
    }

    this.proveedorService.create(data)
      .subscribe(response => {
        if (response.data?.createProveedor._id) {
          this.notify.success('Proveedor registrado con exito!')
          this.router.navigate(['/main', 'proveedores'])
        }
      })
  }

}
