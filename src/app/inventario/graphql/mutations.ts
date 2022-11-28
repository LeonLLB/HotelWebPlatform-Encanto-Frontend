import { gql } from "apollo-angular";


export const CREATE_ARTICULO = gql`

    mutation CREATE_ARTICULO($data: CreateArticuloInput!){
        createArticulo(createArticuloInput: $data){
            _id
        }
    }

`

export interface ArticuloInput{
    nombre: string
    tipo: 'Lenceria' | 'Limpieza'
    mesesUtiles?: number
}
