import { Injectable } from '@angular/core';
import { SingleExecutionResult } from '@apollo/client';
import { MutationResult } from 'apollo-angular';
import { catchError, map, Observable, of } from 'rxjs';
import { PaginateInput } from 'src/app/habitaciones/graphql/queries';
import { Compra, CompraDTO, CompraFromForm } from 'src/app/interfaces/compra.interface';
import { Response } from 'src/app/interfaces/response.interface';
import { GraphqlService } from 'src/app/services/graphql.service';
import { HttpErrorService } from 'src/app/services/http-error.service';
import { LoadingService } from 'src/app/services/loading.service';
import { CREATE_COMPRA_MUTATION, DELETE_COMPRA_MUTATION, UPDATE_COMPRA_MUTATION } from '../graphql/mutations';
import { FilterComprasInput, QUERY_COMPRA, QUERY_COMPRAS } from '../graphql/queries';

@Injectable()
export class ComprasService { 

  constructor(
    private loading: LoadingService,
    private httpError: HttpErrorService,
    private graphql: GraphqlService
  ) { }

  prepareData(rawData: CompraFromForm): CompraDTO{
    let data: CompraDTO = {
      fechaCompra:rawData.fechaCompra!,
      proveedor:rawData.proveedor!,
      baseImponible:+rawData.baseImponible!,
      exento:+rawData.exento!,
      porcentajeIVA:+rawData.porcentajeIVA!,
      articulosComprados: rawData.articulos!.map((articulo,i)=>({
        articulo:articulo!,
        cantidad:+rawData.cantidades![i]!
      }))
    }

    return data
  }

  create(data:CompraDTO): Observable<MutationResult<{createCompra: Compra}>>{
    return this.graphql.mutate<{createCompra:Compra},{data:CompraDTO}>(
      CREATE_COMPRA_MUTATION,
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

  update(data:CompraDTO,id:string): Observable<MutationResult<{updateCompra: Compra}>>{
    return this.graphql.mutate<{updateCompra:Compra},{data:CompraDTO,id:string}>(
      UPDATE_COMPRA_MUTATION,
      {data,id}
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

  delete(id:string): Observable<MutationResult<{removeCompra: Compra}>>{
    return this.graphql.mutate<{removeCompra:Compra},{id:string}>(
      DELETE_COMPRA_MUTATION,
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

  getAll({paginationData,filterData: filterDataRaw}:{paginationData:{limit:number,offset:number},filterData:FilterComprasInput}) :Observable<SingleExecutionResult<{compras:Response<Compra[]>}>> {

    const filterData: FilterComprasInput = {
      anio:filterDataRaw.anio,
      mes:filterDataRaw.mes,
    }

    if(filterDataRaw && filterDataRaw.proveedor !== '') filterData.proveedor = filterDataRaw.proveedor

    return this.graphql.query<{compras:Response<Compra[]>},{filterData:FilterComprasInput, paginacion?: PaginateInput}>(
      QUERY_COMPRAS,
      {paginacion:paginationData,filterData}
    )
  }

  getOne(id:string): Observable<SingleExecutionResult<{compra:Compra}>>{
    return this.graphql.query<{compra:Compra},{id:string}>(
      QUERY_COMPRA,
      {id}
    )
  }
}
