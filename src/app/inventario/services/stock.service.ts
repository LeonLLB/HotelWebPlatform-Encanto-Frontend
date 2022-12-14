import { Injectable } from "@angular/core";
import { SingleExecutionResult } from "@apollo/client/core";
import { MutationResult } from "apollo-angular";
import { Observable } from "rxjs";
import { PaginateInput } from "src/app/habitaciones/graphql/queries";
import { Response } from "src/app/interfaces/response.interface";
import { Stock } from "src/app/interfaces/stock.interface";
import { ConfirmService } from "src/app/services/confirm.service";
import { GraphqlService } from "src/app/services/graphql.service";
import { UPDATE_STOCK } from "../graphql/mutations";
import { QUERY_STOCKS } from "../graphql/queries";


@Injectable()
export class StockService{

    constructor(
        private graphql: GraphqlService
    ){}

    getStocks(paginate:PaginateInput): Observable<SingleExecutionResult<{stocks:Response<Stock[]>}>>{
        return this.graphql.query<{stocks:Response<Stock[]>},{paginate:PaginateInput}>(
           QUERY_STOCKS,
           {paginate} 
        ) 
    }

    changeStock(cantidad: number,articuloId:string): Observable<MutationResult<{updateStock:Stock}>>{
        return this.graphql.mutate<{updateStock:Stock},{cantidad:number,articuloId:string}>(
            UPDATE_STOCK,
            {articuloId,cantidad}
        )
    }

}