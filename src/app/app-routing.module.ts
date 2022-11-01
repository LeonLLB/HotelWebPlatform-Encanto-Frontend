import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UnnecesaryAuthGuard } from './guards/unnecesary-auth.guard';

const routes: Routes = [
  {path:'auth',canActivate:[UnnecesaryAuthGuard],canLoad:[UnnecesaryAuthGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path:'main',canActivate:[AuthGuard],canLoad:[AuthGuard], loadChildren: () => import('./main/main.module').then(m => m.MainModule)},
  {path:'**',redirectTo:'/auth/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
