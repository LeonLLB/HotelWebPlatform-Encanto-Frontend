import { gql } from "apollo-angular";


export const CREATE_ARTICULO = gql`

    mutation CREATE_ARTICULO($data: CreateArticuloInput!){
        createArticulo(createArticuloInput: $data){
            id
        }
    }

`

export const UPDATE_ARTICULO = gql`

    mutation UPDATE_ARTICULO($data: UpdateArticuloInput!,$id: String!){
        updateArticulo(updateArticuloInput: $data,id:$id){
            id
        }
    }

`

export const REMOVE_ARTICULO = gql`

    mutation REMOVE_ARTICULO($id: String!){
        removeArticulo(id:$id){
            id
        }
    }

`


export interface ArticuloInput{
    nombre: string
    tipo: 'Lenceria' | 'Limpieza'
    mesesUtiles?: number
}

export const UPDATE_STOCK = gql`

    mutation UpdateStock($cantidad:Int!,$articuloId: String!){
        updateStock(cantidad:$cantidad,articuloId:$articuloId){
            id
        }
    }

`
