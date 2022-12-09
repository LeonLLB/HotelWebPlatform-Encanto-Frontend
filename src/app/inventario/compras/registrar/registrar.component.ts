import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Proveedor } from 'src/app/interfaces/proveedor.interface';
import { ProveedorService } from 'src/app/proveedores/services/proveedor.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ArticuloService } from '../../services/articulo.service';
import { ComprasService } from '../services/compras.service';

@Component({
  selector: 'hwp-registrar',
  templateUrl: './registrar.component.html',
  styles: [
  ]
})
export class RegistrarComponent implements OnInit {

  isEditableForm = false
  isFetchingArticulos = true
  isFetchingProveedores = true

  avaliablesProveedores: {value:string,label:string}[] = []
  avaliablesArticulos: {value:string,label:string}[] = []

  compraForm = this.fb.group({
    fechaCompra: [new Date().toISOString().split('T')[0],[Validators.required]],
    proveedor: ['',Validators.required],
    baseImponible:[0,[Validators.required]],
    exento:[0,[Validators.required]],
    porcentajeIVA:[16,[Validators.required]],
    articulos: this.fb.array<string>([],[Validators.required,Validators.minLength(1)]),
    cantidades: this.fb.array<string>([],[Validators.required,Validators.minLength(1)]),
  })

  extraArticulo = this.fb.control('')
  extraCantidad = this.fb.control(0)
  hasAddedArticulo = false

  constructor(
    private fb: FormBuilder,
    private comprasService: ComprasService,
    private proveedoresService: ProveedorService,
    private articulosService: ArticuloService,
    private notify: NotifyService,
    private router: Router,
    // private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.addArticuloToForm()
    this.preloadProveedoresYArticulos()
  }  
  
  get additionalArticulos() {
    return this.compraForm.get('articulos') as FormArray
  }

  get additionalCantidades() {
    return this.compraForm.get('cantidades') as FormArray
  }

  get tomorrowDate(): string {
    const date = new Date()
    return new Date(date.getFullYear(),date.getMonth()+1,date.getDate()+1).toISOString().split('T')[0]
  }

  addArticuloToForm() {

    if (this.extraArticulo.invalid || this.extraCantidad.invalid) return;
    this.hasAddedArticulo = true

    this.additionalArticulos.push(this.fb.control(this.extraArticulo.value, [Validators.required]))
    this.additionalCantidades.push(this.fb.control(this.extraCantidad.value, [Validators.required,Validators.min(1)]))

    this.extraArticulo.reset()
    this.extraCantidad.reset()
  }

  preloadProveedoresYArticulos() {
    this.isFetchingArticulos = true
    this.isFetchingProveedores = true
    let stopExecuting = false

    this.proveedoresService.getAllCore()
    .subscribe(result=>{
      if(stopExecuting) return
      this.isFetchingProveedores = false
      if(result.data && result.data.proveedores.result.length > 0){
        result.data.proveedores.result.forEach(proveedor=>{
          this.avaliablesProveedores.push({
            value:proveedor._id,
            label:proveedor.nombre
          })
        })
        return
      }
      stopExecuting=true
      this.notify.failure('No existen proveedores') 
      this.router.navigate(['/main','inventario','compras'])
    })

    this.articulosService.getAllCore()
    .subscribe(result=>{
      if(stopExecuting) return
      this.isFetchingArticulos = false
      if(result.data && result.data.articulosNoPaginados.length > 0){
        result.data.articulosNoPaginados.forEach(articulo=>{
          this.avaliablesArticulos.push({
            value:articulo._id,
            label:articulo.nombre
          })
        })
        return
      }
      stopExecuting=true
      this.notify.failure('No existen artículos') 
      this.router.navigate(['/main','inventario','compras'])
    })

  }

  deleteInputFromArr(i: number) {
    this.additionalArticulos.removeAt(i)
    this.additionalCantidades.removeAt(i)

    if (this.additionalArticulos.length === 0 || this.additionalCantidades.length === 0) this.hasAddedArticulo = false
  }

  registerCompraSubmit(){
    if(this.compraForm.invalid){
      this.compraForm.markAllAsTouched()
      return
    }

    const data = this.comprasService.prepareData(this.compraForm.value)

    if(this.isEditableForm){
      //TODO: LOGICA DE ACTUALIZACION
      return
    }

    this.comprasService.create(data).subscribe(response => {
      if (response.data?.createCompra._id) {
        this.notify.success('Compra registrada con exito!')
        this.router.navigate(['/main', 'inventario','compras'])
      }
    })

  }

}
