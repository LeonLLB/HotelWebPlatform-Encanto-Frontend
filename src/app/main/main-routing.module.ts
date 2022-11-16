import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Route[] = [
  {path:'',component:DashboardComponent,children:[
    {path:'admin',canActivate:[AuthGuard,AdminGuard],canLoad:[AuthGuard,AdminGuard],loadChildren:()=>import('../admin/admin.module').then(m => m.AdminModule)},
    {path:'habitaciones',canActivate:[AuthGuard],canLoad:[AuthGuard],loadChildren:()=>import('../habitaciones/habitaciones.module').then(m => m.HabitacionesModule)},
  ]},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
