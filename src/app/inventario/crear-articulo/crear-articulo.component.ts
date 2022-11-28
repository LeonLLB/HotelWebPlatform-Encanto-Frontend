import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    private articuloService: ArticuloService
  ) { }

  ngOnInit(): void {
  }

  registerArticuloSubmit(){
    if(this.articuloForm.invalid){
      this.articuloForm.markAllAsTouched()
      return
    }
  }

}
