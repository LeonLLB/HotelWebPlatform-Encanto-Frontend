import { Injectable } from '@angular/core';
import { MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Articulo } from 'src/app/interfaces/articulo.interface';
import { GraphqlService } from 'src/app/services/graphql.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ArticuloInput, CREATE_ARTICULO } from '../graphql/mutations';

@Injectable()
export class ArticuloService {
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

  create(data:ArticuloInput): Observable<MutationResult<{createArticulo:Articulo}>>{
    return this.graphql.mutate<{createArticulo:Articulo},{data:ArticuloInput}>(
      CREATE_ARTICULO,
      {data}
    )
  }

}
