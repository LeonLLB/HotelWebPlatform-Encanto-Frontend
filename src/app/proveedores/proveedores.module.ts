import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { GraphQLModule } from '../graphql.module';
import { RegistrarComponent } from './registrar/registrar.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { ProveedorService } from './services/proveedor.service';


@NgModule({
  declarations: [
    RegistrarComponent,
    ConsultarComponent
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    GraphQLModule
  ],
  providers:[ProveedorService]
})
export class ProveedoresModule { }
