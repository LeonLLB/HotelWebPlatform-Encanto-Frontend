import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Route[] = [
  {path:'',component:DashboardComponent,children:[
    {path:'admin',canActivate:[AuthGuard],canLoad:[AuthGuard],loadChildren:()=>import('../admin/admin.module').then(m => m.AdminModule)},
  ]},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
