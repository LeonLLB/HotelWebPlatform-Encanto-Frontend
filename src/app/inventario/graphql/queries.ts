import { gql } from "apollo-angular"


export const QUERY_ARTICULOS_LIMPIEZA = gql`

    query ArticulosLimpieza($pagination: PaginateInput!){
        articulos(paginate:$pagination,tipo:"Limpieza"){
            _id
            nombre
        }
    }

`

export const QUERY_ARTICULOS_LENCERIA = gql`

    query ArticulosLenceria($pagination: PaginateInput!){
        articulos(paginate:$pagination,tipo:"Lenceria"){
            _id
            nombre
            mesesUtiles
        }
    }

`