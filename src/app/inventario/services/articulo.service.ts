import { Injectable } from '@angular/core';
import { SingleExecutionResult } from '@apollo/client/core';
import { MutationResult } from 'apollo-angular';
import { catchError, map, Observable, of } from 'rxjs';
import { Articulo } from 'src/app/interfaces/articulo.interface';
import { GraphqlService } from 'src/app/services/graphql.service';
import { HttpErrorService } from 'src/app/services/http-error.service';
import { LoadingService } from 'src/app/services/loading.service';
import {Response} from 'src/app/interfaces/response.interface'
import { ArticuloInput, CREATE_ARTICULO } from '../graphql/mutations';
import { PaginateInput } from 'src/app/habitaciones/graphql/queries';
import { QUERY_ARTICULOS_LENCERIA, QUERY_ARTICULOS_LIMPIEZA } from '../graphql/queries';

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

  getLimpieza(limit: number, pagina:number): Observable<SingleExecutionResult<{articulos:Response<Articulo[]>}>>{
    return this.graphql.query<{articulos:Response<Articulo[]>},{pagination: PaginateInput}>(
      QUERY_ARTICULOS_LIMPIEZA,
      {pagination:{limit,offset:pagina-1}}
    )
  }

  getLenceria(limit: number, pagina:number): Observable<SingleExecutionResult<{articulos:Response<Articulo[]>}>>{
    return this.graphql.query<{articulos:Response<Articulo[]>},{pagination: PaginateInput}>(
      QUERY_ARTICULOS_LENCERIA,
      {pagination:{limit,offset:pagina-1}}
    )
  }

}
