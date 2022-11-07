import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { ConsultarComponent } from './consultar/consultar.component';
import { RegistrarComponent } from './registrar/registrar.component';

const routes: Routes = [
  {path:'',canActivate:[AuthGuard,AdminGuard],component:ConsultarComponent},
  {path:'registrar',canActivate:[AuthGuard,AdminGuard],component:RegistrarComponent},
  {path:'actualizar/:id',canActivate:[AuthGuard,AdminGuard],component:RegistrarComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HabitacionesRoutingModule { }
