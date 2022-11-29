import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { LOGOUT_QUERY } from 'src/app/graphql/queries';
import { ValidRoles } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { GraphqlService } from 'src/app/services/graphql.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NotifyService } from 'src/app/services/notify.service';
import { Options } from '../interfaces/nav-options.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor(
    private graphql: GraphqlService,
    private router: Router,
    private notifyService: NotifyService,
    private auth: AuthService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.loading.displayLoading('Cerrando sesión...')
    this.graphql.query<{ logout: { success: boolean } }, never>(LOGOUT_QUERY)
      .subscribe(
        {
          next: () => {
            this.redirect()
            this.loading.hideLoading()
          },
          error: (error) => {
            this.loading.hideLoading()            
            if (error.error.statusCode === 401) {
              return this.redirect()
            } else {
              this.redirect()
              console.log(error)
            }
          }
        }
      )
  }

  private redirect() {
    this.notifyService.success('Sesión cerrada con exito!')
    this.router.navigate(['auth', 'login'])
  }

  public get isAdmin(): boolean {
    return this.auth.rol === ValidRoles.admin
  }

  public get habitacionesOptions(): Options[] {
    const { rol } = this.auth
    const coreResult = [
      { label: 'Reservar habitación', icon: 'bed', route: 'main/habitaciones/reservar' },
      { label: 'Alquileres', icon: 'bed', route: 'main/habitaciones/alquileres' },
      { label: 'Alquileres vencidos', icon: 'bed', route: 'main/habitaciones/alquileres-vencidos' },
    ]
    if (rol === ValidRoles.admin) {
      coreResult.push(
        { label: 'Registrar habitaciones', icon: 'hotel', route: 'main/habitaciones/registrar' },
        { label: 'Consultar habitaciones', icon: 'hotel', route: 'main/habitaciones' },
      )
    }
    return coreResult
  }

  inventarioOptions: Options[] = [
    { label: 'Añadir producto', icon: 'add', route: 'main/inventario/articulos/crear' },
    { label: 'Consultar productos', icon: 'search', route: 'main/inventario/articulos/consultar' },
    { label: 'Consultar stock de inventario', icon: 'inventory_2', route: 'main/inventario/stock' },
    { label: 'Registrar compra', icon: 'add_shopping_cart', route: 'main/inventario/compras/registrar' },
    { label: 'Consultar compras', icon: 'shopping_cart', route: 'main/inventario/compras' },
  ]

  proveedoresOptions: Options[] = [
    { label: 'Añadir proveedor', icon: 'person_add_alt_1', route: 'main/proveedores/registrar' },
    { label: 'Consultar proveedores', icon: 'person', route: 'main/proveedores' },
  ]

  adminOptions: Options[] = [
    { label: 'Usuarios', icon: 'person', route: 'main/admin/usuarios' },
  ]


}
