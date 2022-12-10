import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { ConsultarArticulosComponent } from './consultar-articulos/consultar-articulos.component';
import { CrearArticuloComponent } from './crear-articulo/crear-articulo.component';

const routes: Routes = [
  { path:'articulos', canActivate:[AuthGuard, AdminGuard], children:[
    {path:'crear',/* canActivate: ,*/ component:CrearArticuloComponent},
    {path:'actualizar/:id',/* canActivate: ,*/ component:CrearArticuloComponent},
    {path:'consultar',/* canActivate: ,*/ component:ConsultarArticulosComponent},
  ]},
  {path:'compras',canLoad:[AuthGuard,AdminGuard],canActivate:[AuthGuard,AdminGuard], loadChildren: () => import('./compras/compras.module').then(m=>m.ComprasModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
