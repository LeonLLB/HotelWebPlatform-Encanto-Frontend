import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprasRoutingModule } from './compras-routing.module';
import { RegistrarComponent } from './registrar/registrar.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { ComprasService } from './services/compras.service';


@NgModule({
  declarations: [
    RegistrarComponent,
    ConsultarComponent
  ],
  imports: [
    CommonModule,
    ComprasRoutingModule
  ],
  providers:[
    ComprasService
  ]
})
export class ComprasModule { }
