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

export const QUERY_COMPRA = gql`

    query Compra($id: String!){
        compra(id:$id){
            _id
            fechaCompra
            articulosComprados{
                cantidad
                articulo{
                    _id
                }
            }
            proveedor{
                _id
            }
            baseImponible
            exento
            porcentajeIVA
        }
    }

`