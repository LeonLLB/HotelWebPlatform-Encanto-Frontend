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
import { CREATE_COMPRA_MUTATION } from '../graphql/mutations';
import { QUERY_COMPRAS } from '../graphql/queries';

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

  getAll({paginationData}:{paginationData:{limit:number,offset:number}}) :Observable<SingleExecutionResult<{compras:Response<Compra[]>}>> {
    // const data = filterForm?.value
    // const filterData: FilterHabitacionInput = {}

    // if(data && data.numero && data.numero>0) filterData.numero = parseInt(data.numero)
    // if(data && data.piso && data.piso>0) filterData.piso = parseInt(data.piso)
    // if(data && data.caracteristica !== '') filterData.caracteristica = data.caracteristica
    // if(data && data.tipo !== '') filterData.tipo = data.tipo
    // if(data && data.estado !== '') filterData.estado = data.estado

    return this.graphql.query<{compras:Response<Compra[]>},{/* filterComprasInput?:FilterCompraInput, */paginacion?: PaginateInput}>(
      QUERY_COMPRAS,
      {paginacion:paginationData}
    )
  }
}
