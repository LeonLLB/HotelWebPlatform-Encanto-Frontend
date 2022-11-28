import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';
import { ArticuloService } from '../services/articulo.service';

@Component({
  selector: 'hwp-crear-articulo',
  templateUrl: './crear-articulo.component.html',
  styles: [
  ]
})
export class CrearArticuloComponent implements OnInit {

  articuloForm = this.fb.group({
    nombre:['',[Validators.required]],
    tipo:['Limpieza',[Validators.required]],
    mesesUtiles: 1
  })

  isEditableForm = false

  constructor(
    private fb: FormBuilder,
    private articuloService: ArticuloService,
    private notify:NotifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  registerArticuloSubmit(){
    if(this.articuloForm.invalid){
      this.articuloForm.markAllAsTouched()
      return
    }

    if(this.isEditableForm){
      //TODO: LOGICA DE ACTUALIZACIÓN
      return
    }

    this.articuloService.create({
      ...this.articuloForm.value as any,
      mesesUtiles:(this.articuloForm.value.tipo === 'Lenceria') ? +(this.articuloForm.value.mesesUtiles as number) : undefined
    }).subscribe(response => {
      if (response.data?.createArticulo._id) {
        this.notify.success('Producto registrado con exito!')
        this.router.navigate(['/main', 'inventario','articulos'])
      }
    })
  }

}
