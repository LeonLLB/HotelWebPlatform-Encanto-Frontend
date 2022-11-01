import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { RegistrarComponent } from './usuarios/registrar/registrar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UsuariosService } from './services/usuarios.service';



@NgModule({
  declarations: [
    UsuariosComponent,
    RegistrarComponent
  ],
  imports: [
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    CommonModule
  ],
  providers:[UsuariosService]
})
export class AdminModule { }
