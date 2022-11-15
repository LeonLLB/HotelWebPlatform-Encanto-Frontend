import { Injectable } from '@angular/core';
import { SingleExecutionResult } from '@apollo/client/core';
import { MutationResult } from 'apollo-angular';
import { Observable, catchError, of, map } from 'rxjs';
import { Alquiler, AlquilerFormData, AlquilerInputData, ClienteFormData, InvitadosFormData } from 'src/app/interfaces/alquiler.interface';
import { Response } from 'src/app/interfaces/response.interface';
import { GraphqlService } from 'src/app/services/graphql.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ALQUILAR_HABITACION_MUTATION, IAlquilerInput } from '../graphql/mutations';
import { PaginateInput, QUERY_ALQUILERES } from '../graphql/queries';

@Injectable()
export class AlquilerService {

  constructor(
    private graphql: GraphqlService,
    private notify: NotifyService,
    private loading: LoadingService
  ) { }

  generateAlquilerDataFromFormGroups(alquiler:AlquilerFormData,cliente:ClienteFormData,invitados:InvitadosFormData): AlquilerInputData{
    return {
      ...alquiler,
      costoDolar:+alquiler.costoDolar,
      fechaFin:(alquiler.fechaFin.split('-').join('/')),
      fechaInicio:(alquiler.fechaInicio.split('-').join('/')),
      clientePrincipal:{
        ...cliente,
        cedula:+cliente.cedula
      },
      clientesSecundarios: invitados.nombre.map((_,i)=>{
        return {
          nombre: invitados.nombre[i],
          apellido: invitados.apellido[i],
          cedula: +invitados.cedula[i],
          telefono: invitados.telefono[i],
        }
      })
    }
  }

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

  alquilar(data:AlquilerInputData): Observable<MutationResult<{ alquilar: Alquiler }>> {
    this.loading.displayLoading('Alquilando Habitación')
    return this.graphql.mutate<{ alquilar: any }, IAlquilerInput>(
      ALQUILAR_HABITACION_MUTATION,
      { data }
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

  fetchPaginated(paginationData:PaginateInput): Observable<SingleExecutionResult<{alquileres:Response<Alquiler[]>}>>{
    return this.graphql.query<{alquileres:Response<Alquiler[]>},{paginacion?: PaginateInput}>(
      QUERY_ALQUILERES,
      {paginacion:paginationData}
    )
  }

}
