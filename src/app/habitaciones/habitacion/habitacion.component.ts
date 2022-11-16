import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alquiler } from 'src/app/interfaces/alquiler.interface';
import { Habitacion } from 'src/app/interfaces/habitacion.interface';
import { AuthService } from 'src/app/services/auth.service';
import { AlquilerService } from '../services/alquiler.service';

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
    private router: Router
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

  get isAdmin():boolean{
    return this.auth.rol === 'A'
  }

  get alquilerAsArrayData():Alquiler[]{
    return [this.alquiler]
  }

}
