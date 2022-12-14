import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventarioRoutingModule } from './inventario-routing.module';
import { ConsultarArticulosComponent } from './consultar-articulos/consultar-articulos.component';
import { CrearArticuloComponent } from './crear-articulo/crear-articulo.component';
import { GraphQLModule } from '../graphql.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticuloService } from './services/articulo.service';
import { StockComponent } from './stock/stock.component';


@NgModule({
  declarations: [
    ConsultarArticulosComponent,
    CrearArticuloComponent,
    StockComponent
  ],
  imports: [
    CommonModule,
    GraphQLModule,
    SharedModule,
    ReactiveFormsModule,
    InventarioRoutingModule
  ],
  providers:[ArticuloService]
})
export class InventarioModule { }
