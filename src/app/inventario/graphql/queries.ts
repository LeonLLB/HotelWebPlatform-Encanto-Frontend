import { gql } from "apollo-angular"


export const QUERY_ARTICULOS_LIMPIEZA = gql`

    query ArticulosLimpieza($pagination: PaginateInput!){
        articulos(paginate:$pagination,tipo:"Limpieza"){
            result{
                _id
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
                _id
                nombre
                mesesUtiles
            }
            pages
            total
        }
    }

`