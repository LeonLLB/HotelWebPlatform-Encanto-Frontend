import { Injectable } from '@angular/core';
import { SingleExecutionResult } from '@apollo/client/core';
import { MutationResult } from 'apollo-angular';
import { catchError, map, Observable, of } from 'rxjs';
import { Proveedor, ProveedorInput } from 'src/app/interfaces/proveedor.interface';
import { Response } from 'src/app/interfaces/response.interface';
import { GraphqlService } from 'src/app/services/graphql.service';
import { HttpErrorService } from 'src/app/services/http-error.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NotifyService } from 'src/app/services/notify.service';
import { CREATE_PROVEEDOR_MUTATION, REMOVE_PROVEEDOR_MUTATION, UPDATE_PROVEEDOR_MUTATION } from '../graphql/mutations';
import { QUERY_PROVEEDORES } from '../graphql/queries';

@Injectable()
export class ProveedorService {

  constructor(
    private graphql: GraphqlService,
    private httpError: HttpErrorService,
    private loading: LoadingService
  ) { }

  create(data: ProveedorInput): Observable<MutationResult<{createProveedor:Proveedor}>>{
    this.loading.displayLoading('Registrando al proveedor...')
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

  update(data: ProveedorInput, id:string): Observable<MutationResult<{updateProveedor:Proveedor}>>{
    this.loading.displayLoading('Actualizando al proveedor...')
    return this.graphql.mutate<{removeProveedor:Proveedor},{data:ProveedorInput,id:string}>(
      UPDATE_PROVEEDOR_MUTATION,
      {data,id}
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

  delete(id:string): Observable<MutationResult<{removeProveedor:Proveedor}>>{
    this.loading.displayLoading('Eliminando al proveedor...')
    return this.graphql.mutate<{removeProveedor:Proveedor},{id:string}>(
      REMOVE_PROVEEDOR_MUTATION,
      {id}
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

  getAll(limit:number,offset:number): Observable<SingleExecutionResult<{proveedores:Response<Proveedor[]>}>>{
    return this.graphql.query<{proveedores:Response<Proveedor[]>},{paginacion: {limit:number,offset:number}}>(
      QUERY_PROVEEDORES,
      {paginacion:{limit,offset}}
    )
  }

  getProveedor(id:string): Observable<SingleExecutionResult<{proveedor:Proveedor}>>{
    return this.graphql.query<{proveedor:Proveedor},{id:string}>(
      QUERY_PROVEEDORES,
      {id}
    )
  }
}
