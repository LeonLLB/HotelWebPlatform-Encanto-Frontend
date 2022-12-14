import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HabitacionesRoutingModule } from './habitaciones-routing.module';
import { RegistrarComponent } from './registrar/registrar.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HabitacionService } from './services/habitacion.service';
import { EstadoHabitacionDirective } from './directives/estado.directive';
import { HabitacionCardComponent } from './habitacion-card/habitacion-card.component';
import { HabitacionesGridCardsComponent } from './habitaciones-grid-cards/habitaciones-grid-cards.component';
import { ReservarComponent } from './reservar/reservar.component';
import { AlquileresComponent } from './alquileres/alquileres.component';
import { AlquilarComponent } from './alquilar/alquilar.component';
import { AlquilerService } from './services/alquiler.service';
import { HabitacionComponent } from './habitacion/habitacion.component';
import { TipoToIconPipe } from './pipes/tipo-to-icon.pipe';
import { SubirFotoComponent } from './subir-foto/subir-foto.component';
import { ImagenHabitacionPipe } from './pipes/imagen-habitacion.pipe';
import { HttpClientModule } from '@angular/common/http';
import { AlquileresVencidosComponent } from './alquileres-vencidos/alquileres-vencidos.component';
import { ReporteEntradaSalidaComponent } from './reporte-entrada-salida/reporte-entrada-salida.component';
import { ReporteFinancieroAlquileresComponent } from './reporte-financiero-alquileres/reporte-financiero-alquileres.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { StockService } from '../inventario/services/stock.service';


@NgModule({
  declarations: [
    RegistrarComponent,
    ConsultarComponent,
    EstadoHabitacionDirective,
    HabitacionCardComponent,
    HabitacionesGridCardsComponent,
    ReservarComponent,
    AlquileresComponent,
    AlquilarComponent,
    HabitacionComponent,
    SubirFotoComponent,
    TipoToIconPipe,
    ImagenHabitacionPipe,
    AlquileresVencidosComponent,
    ReporteEntradaSalidaComponent,
    ReporteFinancieroAlquileresComponent,
    MantenimientoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    HabitacionesRoutingModule,
    FormsModule
  ],
  providers:[
    HabitacionService,
    AlquilerService,
    StockService
  ]
})
export class HabitacionesModule { }
