import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HabitacionesRoutingModule } from './habitaciones-routing.module';
import { RegistrarComponent } from './registrar/registrar.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HabitacionService } from './services/habitacion.service';
import { EstadoHabitacionDirective } from './directives/estado.directive';
import { HabitacionCardComponent } from './habitacion-card/habitacion-card.component';
import { HabitacionesGridCardsComponent } from './habitaciones-grid-cards/habitaciones-grid-cards.component';
import { ReservarComponent } from './reservar/reservar.component';
import { AlquileresComponent } from './alquileres/alquileres.component';
import { AlquilarComponent } from './alquilar/alquilar.component';
import { AlquilerService } from './services/alquiler.service';


@NgModule({
  declarations: [
    RegistrarComponent,
    ConsultarComponent,
    EstadoHabitacionDirective,
    HabitacionCardComponent,
    HabitacionesGridCardsComponent,
    ReservarComponent,
    AlquileresComponent,
    AlquilarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    HabitacionesRoutingModule
  ],
  providers:[
    HabitacionService,
    AlquilerService
  ]
})
export class HabitacionesModule { }
