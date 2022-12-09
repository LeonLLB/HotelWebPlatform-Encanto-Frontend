import { gql } from "apollo-angular";


export const QUERY_COMPRAS = gql`

    query Compras($paginacion: PaginateInput!,$filterData:FilterComprasInput){
        compras(pagination:$paginacion,filterData:$filterData){
            result{
                _id
                fechaCompra
                articulosComprados{
                    cantidad
                    articulo{
                        nombre
                    }
                }
                proveedor{
                    nombre
                    rif
                }
                baseImponible
                exento
                porcentajeIVA
            }
            pages
            total
        }
    }

`

export interface FilterComprasInput {
    anio: number
    mes: number
    proveedor?: string
}