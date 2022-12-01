import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from 'src/app/services/validator.service';
import { ProveedorService } from '../services/proveedor.service';

@Component({
  selector: 'hwp-registrar',
  templateUrl: './registrar.component.html',
  styles: [
  ]
})
export class RegistrarComponent implements OnInit {

  contactoForm = this.fb.group({
    nombre: ['', Validators.required],
    rif:[Number(undefined), Validators.required],
    direccion:['',Validators.required]
  })
  empresaForm = this.fb.group({
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
    private validators: ValidatorService
  ) { }

  ngOnInit(): void {
  }

  registerSubmit(){
    if(this.contactoForm.invalid || this.empresaForm.invalid){
      this.contactoForm.markAllAsTouched()
      this.empresaForm.markAllAsTouched()
      return
    }

    if(this.isEditableForm){
      //TODO: LOGICA DE ACTUALIZACION

      return
    }

    //TODO: LOGICA DE CREACION
  }

}
