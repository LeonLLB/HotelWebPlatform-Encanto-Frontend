import { Injectable } from '@angular/core';
import { MutationResult } from 'apollo-angular';
import { catchError, map, Observable, of } from 'rxjs';
import { Proveedor, ProveedorInput } from 'src/app/interfaces/proveedor.interface';
import { GraphqlService } from 'src/app/services/graphql.service';
import { HttpErrorService } from 'src/app/services/http-error.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NotifyService } from 'src/app/services/notify.service';
import { CREATE_PROVEEDOR_MUTATION } from '../graphql/mutations';

@Injectable()
export class ProveedorService {

  constructor(
    private graphql: GraphqlService,
    private httpError: HttpErrorService,
    private loading: LoadingService
  ) { }

  create(data: ProveedorInput): Observable<MutationResult<{createProveedor:Proveedor}>>{
    return this.graphql.mutate<{createProveedor:Proveedor},{data:ProveedorInput}>(
      CREATE_PROVEEDOR_MUTATION,
      {data}
    ).pipe(
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
