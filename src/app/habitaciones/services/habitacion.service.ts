import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApolloQueryResult, SingleExecutionResult } from '@apollo/client/core';
import { MutationResult } from 'apollo-angular';
import { catchError, map, Observable, of } from 'rxjs';
import { formToJson } from 'src/app/helpers/formToJson.helper';
import { Habitacion } from 'src/app/interfaces/habitacion.interface';
import { GraphqlService } from 'src/app/services/graphql.service';
import { LoadingService } from 'src/app/services/loading.service';
import {Response} from 'src/app/interfaces/response.interface'
import { CREATE_HABITACION_MUTATION, DELETE_HABITACION_MUTATION, HabitacionInput, IArticulosUtilizadosInput, IHabitacionInput, MANTENIMIENTO_HABITACION_MUTATION, UPDATE_HABITACION_MUTATION } from '../graphql/mutations';
import { FilterHabitacionInput, GET_CARACTERISTICAS_QUERY, PaginateInput, QUERY_CORE_HABITACION, QUERY_CORE_HABITACIONES, QUERY_HABITACION, QUERY_HABITACIONES } from '../graphql/queries';
import { HttpErrorService } from 'src/app/services/http-error.service';
import { Articulo } from 'src/app/interfaces/articulo.interface';


@Injectable()
export class HabitacionService {

  constructor(
    private graphql: GraphqlService,
    private loading: LoadingService,
    private httpError: HttpErrorService
  ) { }  

  create(formData: FormGroup): Observable<MutationResult<{ createHabitacion: Habitacion }>> {
    const data = formToJson<HabitacionInput>(formData, true)
    this.loading.displayLoading('Creando habitación')
    return this.graphql.mutate<{ createHabitacion: Habitacion }, IHabitacionInput>(
      CREATE_HABITACION_MUTATION,
      { habitacionInput: data }
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

  delete(id:string): Observable<MutationResult<{removeHabitacion:Habitacion}>> {
    this.loading.displayLoading('Eliminando habitación...')
    return this.graphql.mutate<{removeHabitacion:Habitacion},{id:string}>(
      DELETE_HABITACION_MUTATION,
      {id}
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

  update(formData: FormGroup,id:string): Observable<MutationResult<{ updateHabitacion: Habitacion }>> {
    const data = formToJson<HabitacionInput>(formData, true)
    this.loading.displayLoading('Actualizando habitación...')
    return this.graphql.mutate<{ updateHabitacion: Habitacion }, (IHabitacionInput & {id:string})>(
      UPDATE_HABITACION_MUTATION,
      { habitacionInput: data ,id}
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

  genMantenimientoData(articulos: Articulo[],cantidades:number[]): IArticulosUtilizadosInput{
    return {
      articulosUtilizados: articulos.map((articulo,i)=>({
        articuloId: articulo.id,
        cantidad: cantidades[i]
      }))
    }
  }

  mantenimiento(data: IArticulosUtilizadosInput,id:string): Observable<MutationResult<{ mantenimiento: Habitacion }>> {
    this.loading.displayLoading('Terminando el mantenimiento de la habitación...')
    return this.graphql.mutate<{ mantenimiento: Habitacion }, {data:IArticulosUtilizadosInput,id:string}>(
      MANTENIMIENTO_HABITACION_MUTATION,
      { data ,id}
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

  getAll({paginationData,doPaginate = true}:{paginationData?:PaginateInput,filterForm?:FormGroup,doPaginate?:boolean}): Observable<SingleExecutionResult<{habitaciones:Response<Habitacion[]>}>>{

    return this.graphql.query<{habitaciones:Response<Habitacion[]>},{filterHabitacionesInput?:FilterHabitacionInput,paginacion?: PaginateInput,doPaginate?:boolean}>(
      QUERY_HABITACIONES,
      {paginacion:paginationData,doPaginate}
    )
  }

  getCaracteristicas(): Observable<string[]>{
    return this.graphql.query<{caracteristicas:{caracteristicas:string[]}},never>(
      GET_CARACTERISTICAS_QUERY
    )
    .pipe(map(res=>res.data.caracteristicas.caracteristicas))
  }

  getOne(id:string):Observable<ApolloQueryResult<{habitacion:Habitacion}>>{
    return this.graphql.query<{habitacion:Habitacion},{id:string}>(
      QUERY_HABITACION,
      {id}
    )
  }

  getSimpleOne(id:string): Observable<ApolloQueryResult<{habitacion:Habitacion}>>{
    return this.graphql.query<{habitacion:Habitacion},{id:string}>(
      QUERY_CORE_HABITACION,
      {id}
    )
  }

  getSimpleOnes(): Observable<ApolloQueryResult<{habitaciones:Response<Habitacion[]>}>>{
    return this.graphql.query<{habitaciones:Response<Habitacion[]>},{doPaginate:boolean}>(
      QUERY_CORE_HABITACIONES,
      {doPaginate:false}
    )
  }
}
