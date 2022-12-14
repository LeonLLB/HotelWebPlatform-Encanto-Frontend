import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleExecutionResult } from '@apollo/client/core';
import {saveAs} from 'file-saver'
import { MutationResult } from 'apollo-angular';
import { Observable, catchError, of, map } from 'rxjs';
import { Alquiler, AlquilerFormData, AlquilerInputData, ClienteFormData, InvitadosFormData } from 'src/app/interfaces/alquiler.interface';
import { Habitacion } from 'src/app/interfaces/habitacion.interface';
import { Response } from 'src/app/interfaces/response.interface';
import { GraphqlService } from 'src/app/services/graphql.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ACTUALIZAR_ALQUILER_MUTATION, ALQUILAR_HABITACION_MUTATION, ELIMINAR_ALQUILER_MUTATION, EXTENDER_O_CULMINAR_ALQUILER_MUTATION, IAlquilerInput, IAlquilerUpdateInput } from '../graphql/mutations';
import { PaginateInput, QUERY_ALQUILER, QUERY_ALQUILERES, QUERY_ALQUILERES_VENCIDOS_ANTERIORES, QUERY_ALQUILERES_VENCIDOS_HOY, QUERY_FULL_ALQUILER } from '../graphql/queries';
import { environment } from 'src/environments/environment';
import { HttpErrorService } from 'src/app/services/http-error.service';

@Injectable()
export class AlquilerService {

  constructor(
    private graphql: GraphqlService,
    private notify: NotifyService,
    private loading: LoadingService,
    private httpError: HttpErrorService,
    private http: HttpClient
  ) { }

  generateAlquilerDataFromFormGroups(alquiler: AlquilerFormData, cliente: ClienteFormData, invitados: InvitadosFormData): AlquilerInputData {
    return {
      ...alquiler,
      costoDolar: +alquiler.costoDolar,
      fechaFin: (alquiler.fechaFin.split('-').join('/')),
      fechaInicio: (alquiler.fechaInicio.split('-').join('/')),
      cliente: {
        ...cliente,
        cedula: +cliente.cedula
      },
      invitados: invitados.nombre.map((_, i) => {
        if (invitados.cedula[i] && invitados.cedula[i] !== '') {
          return {
            nombre: invitados.nombre[i],
            apellido: invitados.apellido[i],
            cedula: +invitados.cedula[i],
          }
        }
        return {
          nombre: invitados.nombre[i],
          apellido: invitados.apellido[i],
        }
      })
    }
  }

  alquilar(data: AlquilerInputData): Observable<MutationResult<{ alquilar: Alquiler }>> {
    this.loading.displayLoading('Alquilando Habitaci??n')
    return this.graphql.mutate<{ alquilar: any }, IAlquilerInput>(
      ALQUILAR_HABITACION_MUTATION,
      { data }
    )
      .pipe(
        catchError(data => {
          this.loading.hideLoading()
          this.httpError.onCatchError(data)
          return of({} as any)
        }),
        map(response => {
          this.loading.hideLoading()
          if (response.errors) {
            this.httpError.onPostPatchFailure(response)
          }
          return response
        })
      )
  }

  fetchPaginated(paginationData: PaginateInput): Observable<SingleExecutionResult<{ alquileres: Response<Alquiler[]> }>> {
    return this.graphql.query<{ alquileres: Response<Alquiler[]> }, { paginacion?: PaginateInput }>(
      QUERY_ALQUILERES,
      { paginacion: paginationData }
    )
  }

  fetchAlquiler(id: string): Observable<SingleExecutionResult<{ alquiler: Alquiler }>> {
    return this.graphql.query<{ alquiler: Alquiler }, { id: string }>(
      QUERY_ALQUILER,
      { id }
    )
  }

  update(data: AlquilerInputData, motivo: 'Datos' | 'Error' | 'Traslado', id: string): Observable<MutationResult<{ updateAlquiler: Alquiler }>> {
    this.loading.displayLoading('Actualizando el alquiler  de la habitaci??n')
    return this.graphql.mutate<{ updateAlquiler: Alquiler }, IAlquilerUpdateInput>(
      ACTUALIZAR_ALQUILER_MUTATION,
      { data, motivo, id }
    )
      .pipe(
        catchError(data => {
          this.loading.hideLoading()
          this.httpError.onCatchError(data)
          return of({} as any)
        }),
        map(response => {
          this.loading.hideLoading()
          if (response.errors) {
            this.httpError.onPostPatchFailure(response)
          }
          return response
        })
      )
  }

  delete(id: string): Observable<MutationResult<{ eliminarAlquiler: Alquiler }>> {
    this.loading.displayLoading('Eliminando Alquiler...')
    return this.graphql.mutate<{ eliminarAlquiler: Alquiler }, { id: string }>(
      ELIMINAR_ALQUILER_MUTATION,
      { id }
    )
      .pipe(
        catchError(data => {
          this.loading.hideLoading()
          this.httpError.onCatchError(data)
          return of({} as any)
        }),
        map(response => {
          this.loading.hideLoading()
          if (response.errors) {
            this.httpError.onPostPatchFailure(response)
          }
          return response
        })
      )
  }

  getAllDataFromAlquiler(habitacionId: string): Observable<SingleExecutionResult<{ alquiler: Alquiler, habitacion: Habitacion }>> {
    return this.graphql.query<{ alquiler: Alquiler, habitacion: Habitacion }, { id: string }>(
      QUERY_FULL_ALQUILER,
      { id: habitacionId }
    )
  }

  getAlquileresVencidosHoy(paginateInput: PaginateInput): Observable<SingleExecutionResult<{ alquileresVencidosHoy: Response<Alquiler[]> }>> {
    return this.graphql.query<{
      alquileresVencidosHoy: Response<Alquiler[]>,
    }, { paginateInput: PaginateInput }>(
      QUERY_ALQUILERES_VENCIDOS_HOY,
      { paginateInput }
    )
  }

  getAlquileresVencidosAnteriores(paginateInput: PaginateInput): Observable<SingleExecutionResult<{ alquileresVencidosAnteriores: Response<Alquiler[]> }>> {
    return this.graphql.query<{
      alquileresVencidosAnteriores: Response<Alquiler[]>,
    }, { paginateInput: PaginateInput }>(
      QUERY_ALQUILERES_VENCIDOS_ANTERIORES,
      { paginateInput }
    )
  }

  actualizarEstadoAlquiler(id: string, caso: 'Extension' | 'Culminacion'): Observable<MutationResult<{ actualizarEstadoAlquiler: Alquiler }>> {
    return this.graphql.mutate<{ actualizarEstadoAlquiler: Alquiler }, { id: string, caso: 'Extension' | 'Culminacion' }>(
      EXTENDER_O_CULMINAR_ALQUILER_MUTATION,
      { id, caso }
    )
  }

  generarReporteEntradaSalida(fecha: Date): void {

    this.http.get(environment.apiUrl + '/files/alquiler/reporte-entrada-salida?mes='+(fecha.getMonth()+1)+'&year='+(fecha.getFullYear())+'&dia='+(fecha.getDate()), {
      responseType: 'blob',
      withCredentials:true
    })
      .pipe(
        catchError((err) => {
          this.loading.hideLoading()
          if(err.status === 404){
            this.notify.failure('No existen datos para esa fecha')
            return of(null)
          }
          this.notify.failure('Hubo un error al generar el reporte')
          console.log(err)
          return of(null)
        })
      )
      .subscribe(data => {
        if (data) {
          this.loading.hideLoading()
          this.notify.success('Reporte generado')
          saveAs(data, `${new Date().getTime()}-reporte-entrada-salida.pdf`)
        }
      })
  }

  generarReporteFinancieroAlquileres(mes: string, year: string): void {

    this.http.get(environment.apiUrl + '/files/alquiler/reporte-financiero?mes='+mes+'&year='+year, {
      responseType: 'blob',
      withCredentials:true
    })
      .pipe(
        catchError((err) => {
          this.loading.hideLoading()
          if(err.status === 404){
            this.notify.failure('No existen datos para esa fecha')
            return of(null)
          }
          this.notify.failure('Hubo un error al generar el reporte')
          console.log(err)
          return of(null)
        })
      )
      .subscribe(data => {
        if (data) {
          this.loading.hideLoading()
          this.notify.success('Reporte generado')
          saveAs(data, `${new Date().getTime()}-reporte-financiero-alquiler.pdf`)
        }
      })
  }
}
