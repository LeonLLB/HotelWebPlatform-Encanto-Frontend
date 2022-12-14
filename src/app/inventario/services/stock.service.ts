import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SingleExecutionResult } from "@apollo/client/core";
import { MutationResult } from "apollo-angular";
import saveAs from "file-saver";
import { catchError, map, Observable, of } from "rxjs";
import { PaginateInput } from "src/app/habitaciones/graphql/queries";
import { Response } from "src/app/interfaces/response.interface";
import { Stock } from "src/app/interfaces/stock.interface";
import { ConfirmService } from "src/app/services/confirm.service";
import { GraphqlService } from "src/app/services/graphql.service";
import { HttpErrorService } from "src/app/services/http-error.service";
import { LoadingService } from "src/app/services/loading.service";
import { NotifyService } from "src/app/services/notify.service";
import { environment } from "src/environments/environment";
import { UPDATE_STOCK } from "../graphql/mutations";
import { QUERY_NONPAGINATED_STOCKS, QUERY_STOCKS } from "../graphql/queries";


@Injectable()
export class StockService{

    constructor(
        private graphql: GraphqlService,
        private loading: LoadingService,
        private httpError: HttpErrorService,
        private http: HttpClient,
        private notify: NotifyService
    ){}

    getStocks(paginate:PaginateInput): Observable<SingleExecutionResult<{stocks:Response<Stock[]>}>>{
        return this.graphql.query<{stocks:Response<Stock[]>},{paginate:PaginateInput}>(
           QUERY_STOCKS,
           {paginate} 
        )         
    }

    getNonPaginatedStocks():Observable<SingleExecutionResult<{stocks:Response<Stock[]>}>>{
      return this.graphql.query<{stocks:Response<Stock[]>},never>(
        QUERY_NONPAGINATED_STOCKS,
     )  
    }

    changeStock(cantidad: number,articuloId:string): Observable<MutationResult<{updateStock:Stock}>>{
        this.loading.displayLoading('Cambiando el stock...')
        return this.graphql.mutate<{updateStock:Stock},{cantidad:number,articuloId:string}>(
            UPDATE_STOCK,
            {articuloId,cantidad}
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

    generarReporteStock(mes: string, year: string): void {

      this.http.get(environment.apiUrl + '/files/stock/reporte-inventario?mes='+mes+'&year='+year, {
        responseType: 'blob',
        withCredentials:true
      })
        .pipe(
          catchError((err) => {
            this.loading.hideLoading()
            if(err.status === 404){
              this.notify.failure('No existen datos para esa fecha')
              return of(null)
            }
            this.notify.failure('Hubo un error al generar el reporte')
            console.log(err)
            return of(null)
          })
        )
        .subscribe(data => {
          if (data) {
            this.loading.hideLoading()
            this.notify.success('Reporte generado')
            saveAs(data, `${new Date().getTime()}-reporte-stock.pdf`)
          }
        })
    }

}