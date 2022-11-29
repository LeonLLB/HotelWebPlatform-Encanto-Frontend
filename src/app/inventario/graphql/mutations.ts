import { gql } from "apollo-angular";


export const CREATE_ARTICULO = gql`

    mutation CREATE_ARTICULO($data: CreateArticuloInput!){
        createArticulo(createArticuloInput: $data){
            _id
        }
    }

`

export const UPDATE_ARTICULO = gql`

    mutation UPDATE_ARTICULO($data: UpdateArticuloInput!,$id: String!){
        updateArticulo(updateArticuloInput: $data,id:$id){
            _id
        }
    }

`

export const REMOVE_ARTICULO = gql`

    mutation REMOVE_ARTICULO($id: String!){
        removeArticulo(id:$id){
            _id
        }
    }

`


export interface ArticuloInput{
    nombre: string
    tipo: 'Lenceria' | 'Limpieza'
    mesesUtiles?: number
}
