import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { ConsultarArticulosComponent } from './consultar-articulos/consultar-articulos.component';
import { CrearArticuloComponent } from './crear-articulo/crear-articulo.component';
import { ReporteStockComponent } from './reporte-stock/reporte-stock.component';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  { path:'articulos', canActivate:[AuthGuard, AdminGuard], children:[
    {path:'crear',/* canActivate: ,*/ component:CrearArticuloComponent},
    {path:'actualizar/:id',/* canActivate: ,*/ component:CrearArticuloComponent},
    {path:'consultar',/* canActivate: ,*/ component:ConsultarArticulosComponent},
  ]},
  {path:'compras',canLoad:[AuthGuard,AdminGuard],canActivate:[AuthGuard,AdminGuard], loadChildren: () => import('./compras/compras.module').then(m=>m.ComprasModule)},
  {path:'stock',canLoad:[AuthGuard,AdminGuard],canActivate:[AuthGuard,AdminGuard], component: StockComponent},
  {path:'reporte-stock',canLoad:[AuthGuard,AdminGuard],canActivate:[AuthGuard,AdminGuard], component: ReporteStockComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
