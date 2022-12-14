import { gql } from "apollo-angular";


export const CREATE_COMPRA_MUTATION = gql`

    mutation CreateCompra($data: CreateCompraInput!){
        createCompra(createCompraInput:$data){
            id
        }
    }

`

export const UPDATE_COMPRA_MUTATION = gql`

    mutation UpdateCompra($data: UpdateCompraInput!,$id:String!){
        updateCompra(updateCompraInput:$data,id:$id){
            id
        }
    }

`

export const DELETE_COMPRA_MUTATION = gql`

    mutation DeleteCompra($id:String!){
        removeCompra(id:$id){
            id
        }
    }

`