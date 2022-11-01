import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
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
    private http: HttpClient,
    private router: Router,
    private notifyService: NotifyService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.loading.displayLoading('Cerrando sesión...')
    this.http.post('$/users/logout',{})
    .subscribe({
      next:()=>{
        this.redirect()
        this.loading.hideLoading()
      },
      error:(error)=>{
        this.loading.hideLoading()
        if(error.error.statusCode === 401){
          return this.redirect()
        } else{
          this.redirect()
          console.log(error)
        }
      }
    })
  }

  private redirect(){
    this.notifyService.success('Sesión cerrada con exito!')
    this.router.navigate(['auth','login'])
  }

  pescadoresOptions: Options[] = [
    {label: 'Añadir', icon:'add',route:'main/pescadores/registrar'},
    {label: 'Consulta', icon:'phishing',route:'main/pescadores'},
    {label: 'Embarcaciones', icon:'sailing',route:'main/pescadores/embarcaciones'},
  ]

  produccionOptions: Options[] = [
    {label: 'Añadir', icon:'add',route:'main/produccion/registrar'},
    {label: 'Consulta', icon:'phishing',route:'main/produccion'},
    {label: 'Faenas', icon:'sailing',route:'main/produccion/faenas'},
    {label: 'Especies', icon:'set_meal',route:'main/produccion/especies'},
    {label: 'Estadisticas', icon:'bar_chart',route:'main/produccion/estadisticas'},
  ]

  recursosOptions: Options[] = [
    {label: 'Asignar distribución', icon:'add',route:'main/recursos/distribuir'},
    {label: 'Asignar litraje', icon:'add',route:'main/recursos/litraje'},
    {label: 'Consulta', icon:'oil_barrel',route:'main/recursos'},
  ]

  adminOptions: Options[] = [
    {label: 'Usuarios', icon:'person', route:'main/admin/usuarios'},
    {label: 'Configuración', icon:'settings',route:'main/admin/configuracion'},
    {label: 'Estado', icon:'settings',route:'main/admin/estado'},
    {label: 'Respaldo', icon:'backup',route:'main/admin/respaldo'},
  ]

  
}
