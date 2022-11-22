import { Component, OnInit } from '@angular/core';
import { AlquilerService } from '../services/alquiler.service';

@Component({
  selector: 'hwp-reporte-entrada-salida',
  templateUrl: './reporte-entrada-salida.component.html',
  styles: [
  ]
})
export class ReporteEntradaSalidaComponent implements OnInit {

  fecha!: string

  constructor(
    private alquilerService: AlquilerService
  ) { }

  ngOnInit(): void {
  }

  generate(){
    const date = new Date(this.fecha.replaceAll('-','/').split('T')[0])
    this.alquilerService.generarReporteEntradaSalida(date)
  }

}
