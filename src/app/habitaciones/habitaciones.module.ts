import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HabitacionesRoutingModule } from './habitaciones-routing.module';
import { RegistrarComponent } from './registrar/registrar.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HabitacionService } from './services/habitacion.service';


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
  ],
  providers:[
    HabitacionService
  ]
})
export class HabitacionesModule { }
