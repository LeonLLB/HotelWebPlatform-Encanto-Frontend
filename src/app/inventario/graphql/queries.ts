import { gql } from "apollo-angular"


export const QUERY_ARTICULOS_LIMPIEZA = gql`

    query ArticulosLimpieza($pagination: PaginateInput!){
        articulos(paginate:$pagination,tipo:"Limpieza"){
            result{
                id
                nombre
            }
            pages
            total
        }
    }

`

export const QUERY_ARTICULOS_LENCERIA = gql`

    query ArticulosLenceria($pagination: PaginateInput!){
        articulos(paginate:$pagination,tipo:"Lenceria"){
            result{
                id
                nombre
                mesesUtiles
            }
            pages
            total
        }
    }

`

export const QUERY_ARTICULOS_CORE = gql`

    query ArticulosSinPaginar{
        articulosNoPaginados{
            id
            nombre
        }
    }

`

export const QUERY_ARTICULO = gql`

    query Articulo($id: String!){
        articulo(id: $id) {
            id
            nombre
            tipo
            mesesUtiles
        }
    }

`