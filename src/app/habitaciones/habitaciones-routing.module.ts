import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { AlquileresComponent } from './alquileres/alquileres.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { ReservarComponent } from './reservar/reservar.component';

const routes: Routes = [
  {path:'',canActivate:[AuthGuard,AdminGuard],component:ConsultarComponent},
  {path:'registrar',canActivate:[AuthGuard,AdminGuard],component:RegistrarComponent},
  {path:'reservar',canActivate:[AuthGuard],component:ReservarComponent},
  {path:'alquileres',canActivate:[AuthGuard],component:AlquileresComponent},
  {path:'actualizar/:id',canActivate:[AuthGuard,AdminGuard],component:RegistrarComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HabitacionesRoutingModule { }
