import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApolloQueryResult, SingleExecutionResult } from '@apollo/client/core';
import { MutationResult } from 'apollo-angular';
import { catchError, map, Observable, of } from 'rxjs';
import { formToJson } from 'src/app/helpers/formToJson.helper';
import { Habitacion } from 'src/app/interfaces/habitacion.interface';
import { GraphqlService } from 'src/app/services/graphql.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NotifyService } from 'src/app/services/notify.service';
import {Response} from 'src/app/interfaces/response.interface'
import { CREATE_HABITACION_MUTATION, DELETE_HABITACION_MUTATION, HabitacionInput, IHabitacionInput, UPDATE_HABITACION_MUTATION } from '../graphql/mutations';
import { FilterHabitacionInput, GET_CARACTERISTICAS_QUERY, PaginateInput, QUERY_HABITACION, QUERY_HABITACIONES } from '../graphql/queries';


@Injectable()
export class HabitacionService {

  constructor(
    private graphql: GraphqlService,
    private notify: NotifyService,
    private loading: LoadingService
  ) { }

  private onPostPatchFailure({ errors }: MutationResult<any>) {
    console.error(errors)

    // if (.error.message[0]?.includes('3')) {
    //   this.notifyService.failure('Tanto el nombre como el apellido deben tener más de 3 caracteres')
    //   return;
    // }
    // if (typeof err.error.message === 'string' && err.error.statusCode < 500) {
    //   this.notifyService.failure(err.error.message)
    //   return
    // }
    this.notify.failure('Ocurrio un error, por favor contacte al administrador de sistemas')
  }

  private onCatchError(data: any) {
    if (data.networkError !== null && data.networkError !== undefined) {
      if ((data.networkError.error?.errors as { message: string }[])[0].message.includes('got invalid value')) {
        this.notify.failure('Parece que ciertos valores no puedieron ser enviados correctamente, consulte con el administrador')
      }
      return
    }
    if(data.graphQLErrors.length > 0){
      const errorMsg = data.graphQLErrors[0].extensions?.response?.message
      if ( errorMsg.constructor.toString().includes('Array') && (errorMsg as string[])[0].includes('must')) {
        this.notify.failure('Parece que ciertos valores pudieron no haber sido validos, consulte con el administrador')
      }
      else if(errorMsg.constructor.toString().includes('String')){
        this.notify.failure(errorMsg)
      }
      return
    }
    console.log({ ...data })
    this.notify.failure('Hubo un error, consulte al administrador de sistemas')
  }

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
          this.onCatchError(data)
          return of({} as any)
        }),
        map(response => {
          this.loading.hideLoading()
          if (response.errors) {
            this.onPostPatchFailure(response)
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
        this.onCatchError(data)
        return of({} as any)
      }),
      map(response => {
        this.loading.hideLoading()
        if (response.errors) {
          this.onPostPatchFailure(response)
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
          this.onCatchError(data)
          return of({} as any)
        }),
        map(response => {
          this.loading.hideLoading()
          if (response.errors) {
            this.onPostPatchFailure(response)
          }
          return response
        })
      )
  }

  getAll({paginationData,filterForm,doPaginate = true}:{paginationData?:PaginateInput,filterForm?:FormGroup,doPaginate?:boolean}): Observable<SingleExecutionResult<{habitaciones:Response<Habitacion[]>}>>{
    const data = filterForm?.value
    const filterData: FilterHabitacionInput = {}

    if(data && data.numero && data.numero>0) filterData.numero = parseInt(data.numero)
    if(data && data.piso && data.piso>0) filterData.piso = parseInt(data.piso)
    if(data && data.caracteristica !== '') filterData.caracteristica = data.caracteristica
    if(data && data.tipo !== '') filterData.tipo = data.tipo
    if(data && data.estado !== '') filterData.estado = data.estado

    return this.graphql.query<{habitaciones:Response<Habitacion[]>},{filterHabitacionesInput?:FilterHabitacionInput,paginacion?: PaginateInput,doPaginate?:boolean}>(
      QUERY_HABITACIONES,
      {filterHabitacionesInput:filterData,paginacion:paginationData,doPaginate}
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
}
