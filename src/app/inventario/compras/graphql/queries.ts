import { gql } from "apollo-angular";


export const QUERY_COMPRAS = gql`

    query Compras($paginacion: PaginateInput!){
        compras(pagination:$paginacion){
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
    }

`