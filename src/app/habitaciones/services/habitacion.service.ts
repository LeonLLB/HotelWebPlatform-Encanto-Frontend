import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SingleExecutionResult } from '@apollo/client/core';
import { MutationResult } from 'apollo-angular';
import { catchError, map, Observable, of } from 'rxjs';
import { formToJson } from 'src/app/helpers/formToJson.helper';
import { Habitacion } from 'src/app/interfaces/habitacion.interface';
import { GraphqlService } from 'src/app/services/graphql.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NotifyService } from 'src/app/services/notify.service';
import { CREATE_HABITACION_MUTATION, HabitacionInput, ICreateHabitacionInput } from '../graphql/mutations';

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
    console.log({ ...data })
    if (data.networkError !== null && data.networkError !== undefined) {
      if ((data.networkError.error?.errors as { message: string }[])[0].message.includes('got invalid value')) {
        console.log(data.networkError)
        this.notify.failure('Parece que ciertos valores no puedieron ser enviados correctamente, consulte con el administrador')
      }
      return
    }
    if(data.graphQLErrors.length > 0){
      if ((data.graphQLErrors[0].extensions?.response?.message as string[])[0].includes('must')) {
        console.log(data.graphQLErrors)
        this.notify.failure('Parece que ciertos valores pudieron no haber sido validos, consulte con el administrador')
      }
      return
    }
    console.log({ ...data })
    this.notify.failure('Hubo un error, consulte al administrador de sistemas')
  }

  create(formData: FormGroup): Observable<MutationResult<{ createHabitacion: Habitacion }>> {
    const data = formToJson<HabitacionInput>(formData, true)
    this.loading.displayLoading('Creando habitación')
    return this.graphql.mutate<{ createHabitacion: Habitacion }, ICreateHabitacionInput>(
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
}
