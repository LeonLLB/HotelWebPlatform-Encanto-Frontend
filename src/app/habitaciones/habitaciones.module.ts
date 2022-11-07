import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HabitacionesRoutingModule } from './habitaciones-routing.module';
import { RegistrarComponent } from './registrar/registrar.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegistrarComponent,
    ConsultarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    HabitacionesRoutingModule
  ]
})
export class HabitacionesModule { }
