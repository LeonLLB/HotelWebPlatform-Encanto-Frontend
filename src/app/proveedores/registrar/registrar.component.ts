import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedor, ProveedorInput } from 'src/app/interfaces/proveedor.interface';
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
    rif:['', Validators.required],
    direccion:['',Validators.required]
  })
  contactoForm = this.fb.group({
    nombre:['',Validators.required],
    apellido:['',Validators.required],
    telefono:['',[Validators.required,this.validators.venezuelanNumber]]
  })

  proveedorId!: string

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
    this.route.params.subscribe(params=>{
      if(params['id']){
        this.proveedorService.getProveedor(params['id']).subscribe(response=>this.preLoadForm(response.data?.proveedor))
      }
    })
  }

  preLoadForm(proveedor:Proveedor | undefined | null){
    if(!proveedor) {this.router.navigate(['/main','proveedores']);return}

    this.isEditableForm = true
    this.proveedorId = proveedor.id
    this.empresaForm.setValue({
      nombre:proveedor.nombre,
      rif:proveedor.rif,
      direccion: proveedor.direccion
    })
    this.contactoForm.setValue({
      nombre:proveedor.contacto.nombre,
      apellido:proveedor.contacto.apellido,
      telefono:proveedor.contacto.telefono,
    })
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
      this.proveedorService.update(data,this.proveedorId)
      .subscribe(response => {
        if (response.data?.updateProveedor.id) {
          this.notify.success('Proveedor actualizado con exito!')
          this.router.navigate(['/main', 'proveedores'])
        }
      })
      return
    }

    this.proveedorService.create(data)
      .subscribe(response => {
        if (response.data?.createProveedor.id) {
          this.notify.success('Proveedor registrado con exito!')
          this.router.navigate(['/main', 'proveedores'])
        }
      })
  }

}
