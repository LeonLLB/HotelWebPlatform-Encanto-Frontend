import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprasRoutingModule } from './compras-routing.module';
import { RegistrarComponent } from './registrar/registrar.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { ComprasService } from './services/compras.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { GraphQLModule } from 'src/app/graphql.module';
import { ArticuloService } from '../services/articulo.service';
import { ProveedorService } from 'src/app/proveedores/services/proveedor.service';


@NgModule({
  declarations: [
    RegistrarComponent,
    ConsultarComponent
  ],
  imports: [
    CommonModule,
    ComprasRoutingModule,
    ReactiveFormsModule,
    SharedModule,    
    GraphQLModule  
  ],
  providers:[
    ComprasService,
    ArticuloService,
    ProveedorService
  ]
})
export class ComprasModule { }
