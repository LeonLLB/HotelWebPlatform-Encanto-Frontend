import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { UnnecesaryAuthGuard } from '../guards/unnecesary-auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Route[] = [
  {path: 'login',canActivate:[UnnecesaryAuthGuard],component:LoginComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
