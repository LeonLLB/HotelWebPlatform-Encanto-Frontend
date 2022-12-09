import { Injectable } from '@angular/core';
import { MutationResult } from 'apollo-angular';
import { catchError, map, Observable, of } from 'rxjs';
import { Compra, CompraDTO, CompraFromForm } from 'src/app/interfaces/compra.interface';
import { GraphqlService } from 'src/app/services/graphql.service';
import { HttpErrorService } from 'src/app/services/http-error.service';
import { LoadingService } from 'src/app/services/loading.service';
import { CREATE_COMPRA_MUTATION } from '../graphql/mutations';

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
}
