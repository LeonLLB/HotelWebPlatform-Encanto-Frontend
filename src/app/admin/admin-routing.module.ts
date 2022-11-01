import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RegistrarComponent } from './usuarios/registrar/registrar.component';

const routes: Route[] = [
  {path:'usuarios',children:[
    {path:'',component:UsuariosComponent},
    {path:'registrar',component:RegistrarComponent},
    {path:'actualizar/:id',component:RegistrarComponent},
  ]},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
