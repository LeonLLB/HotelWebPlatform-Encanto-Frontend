import { Injectable } from '@angular/core';
import { MutationResult } from 'apollo-angular';
import { catchError, map, Observable, of } from 'rxjs';
import { Articulo } from 'src/app/interfaces/articulo.interface';
import { GraphqlService } from 'src/app/services/graphql.service';
import { HttpErrorService } from 'src/app/services/http-error.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ArticuloInput, CREATE_ARTICULO } from '../graphql/mutations';

@Injectable()
export class ArticuloService {
  constructor(
    private graphql: GraphqlService, 
    private loading: LoadingService,
    private httpError: HttpErrorService
  ) { }

  create(data:ArticuloInput): Observable<MutationResult<{createArticulo:Articulo}>>{
    this.loading.displayLoading('Creando producto...')
    return this.graphql.mutate<{createArticulo:Articulo},{data:ArticuloInput}>(
      CREATE_ARTICULO,
      {data}
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

}
