import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { AlquilarComponent } from './alquilar/alquilar.component';
import { AlquileresVencidosComponent } from './alquileres-vencidos/alquileres-vencidos.component';
import { AlquileresComponent } from './alquileres/alquileres.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { HabitacionComponent } from './habitacion/habitacion.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { ReporteEntradaSalidaComponent } from './reporte-entrada-salida/reporte-entrada-salida.component';
import { ReporteFinancieroAlquileresComponent } from './reporte-financiero-alquileres/reporte-financiero-alquileres.component';
import { ReservarComponent } from './reservar/reservar.component';
import { SubirFotoComponent } from './subir-foto/subir-foto.component';

const routes: Routes = [
  {path:'',canActivate:[AuthGuard,AdminGuard],component:ConsultarComponent},
  {path:'registrar',canActivate:[AuthGuard,AdminGuard],component:RegistrarComponent},
  {path:'subir-imagen/:id',canActivate:[AuthGuard,AdminGuard],component:SubirFotoComponent},
  {path:'reservar',canActivate:[AuthGuard],component:ReservarComponent},
  {path:'reporte-entrada-salida',canActivate:[AuthGuard],component:ReporteEntradaSalidaComponent},
  {path:'reporte-financiero-alquileres',canActivate:[AuthGuard,AdminGuard],component:ReporteFinancieroAlquileresComponent},
  {path:'alquilar/:habitacionId',canActivate:[AuthGuard],component:AlquilarComponent},
  {path:'actualizar-alquiler/:id',canActivate:[AuthGuard],component:AlquilarComponent},
  {path:'alquileres',canActivate:[AuthGuard],component:AlquileresComponent},
  {path:'alquileres-vencidos',canActivate:[AuthGuard],component:AlquileresVencidosComponent},
  {path:'actualizar/:id',canActivate:[AuthGuard,AdminGuard],component:RegistrarComponent},
  {path:'mantenimiento/:id',canActivate:[AuthGuard],component:MantenimientoComponent},
  {path:':id',canActivate:[AuthGuard],component:HabitacionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HabitacionesRoutingModule { }
