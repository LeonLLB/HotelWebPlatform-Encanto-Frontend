import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alquiler } from 'src/app/interfaces/alquiler.interface';
import { Habitacion } from 'src/app/interfaces/habitacion.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmService } from 'src/app/services/confirm.service';
import { NotifyService } from 'src/app/services/notify.service';
import { AlquilerService } from '../services/alquiler.service';
import { HabitacionService } from '../services/habitacion.service';

@Component({
  selector: 'hwp-habitacion',
  templateUrl: './habitacion.component.html',
  styles: [
  ]
})
export class HabitacionComponent implements OnInit {

  habitacion!: Habitacion
  alquiler!: Alquiler

  isFetching = true

  constructor(
    private alquilerService: AlquilerService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private habitacionService: HabitacionService,
    private confirm: ConfirmService,
    private notify: NotifyService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      if(params['id']){
        this.fetchData(params['id'])
        return
      }
      console.log('here too')
      this.router.navigate(['/main','habitaciones'])
    })
  }

  fetchData(id:string){
    this.isFetching = true
    this.alquilerService.getAllDataFromAlquiler(id)
    .subscribe(response=>{
      this.isFetching = false
      if(!response.data){
        this.router.navigate(['/main','habitaciones'])
        return
      }
      this.alquiler = response.data.alquiler
      this.habitacion = response.data.habitacion
    })
  }

  getDateFromData(dateAsString: string){
    return new Date(+dateAsString)
  }

  eliminarHabitacion(){
    this.confirm.danger({
      title:'Eliminar habitación N° ' + this.habitacion.numero,
      message:'Esta seguro de querer eliminar esta habitación? Tenga en cuenta que eliminar está habitación tambien eliminará los alquileres y reportes financieros de la misma',
      okText:'Eliminar',
      onOk:()=>{
        this.habitacionService.delete(this.habitacion._id)
        .subscribe((response)=>{
          if (response.data?.removeHabitacion._id) {
            this.notify.success('Habitación eliminada con exito!')
            this.router.navigate(['/main','habitaciones'])
          }
        })
      }
    })
  }

  get isAdmin():boolean{
    return this.auth.rol === 'A'
  }

  get alquilerAsArrayData():Alquiler[]{
    return [this.alquiler]
  }

}
