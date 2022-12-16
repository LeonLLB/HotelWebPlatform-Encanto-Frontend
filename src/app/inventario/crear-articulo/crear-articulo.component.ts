import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Articulo } from 'src/app/interfaces/articulo.interface';
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
  articuloId!:string

  isEditableForm = false

  constructor(
    private fb: FormBuilder,
    private articuloService: ArticuloService,
    private notify:NotifyService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      if(params['id']){
        this.articuloService.getArticulo(params['id']).subscribe(response=>this.preLoadForm(response.data?.articulo))
      }
    })
  }

  preLoadForm(articulo:Articulo | undefined | null){
    if(!articulo) {this.router.navigate(['/main','inventario','articulos','consultar']);return}

    this.isEditableForm = true
    this.articuloId = articulo.id
    this.articuloForm.setValue({
      nombre:articulo.nombre,
      tipo:articulo.tipo,
      mesesUtiles: (articulo.mesesUtiles) ? articulo.mesesUtiles : 1
    })
  }

  registerArticuloSubmit(){
    if(this.articuloForm.invalid){
      this.articuloForm.markAllAsTouched()
      return
    }

    const data = {
      ...this.articuloForm.value as any,
      mesesUtiles:(this.articuloForm.value.tipo === 'Lenceria') ? +(this.articuloForm.value.mesesUtiles as number) : undefined
    }

    if(this.isEditableForm){
      this.articuloService.update(data,this.articuloId).subscribe(response => {
        if (response.data?.updateArticulo.id) {
          this.notify.success('Producto actualizado con exito!')
          this.router.navigate(['/main', 'inventario','articulos','consultar'])
        }
      })
      return
    }

    this.articuloService.create(data).subscribe(response => {
      if (response.data?.createArticulo.id) {
        this.notify.success('Producto registrado con exito!')
        this.router.navigate(['/main', 'inventario','articulos','consultar'])
      }
    })
  }

}
