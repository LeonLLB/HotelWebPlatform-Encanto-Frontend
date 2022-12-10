import { gql } from "apollo-angular";


export const CREATE_COMPRA_MUTATION = gql`

    mutation CreateCompra($data: CreateCompraInput!){
        createCompra(createCompraInput:$data){
            _id
        }
    }

`

export const UPDATE_COMPRA_MUTATION = gql`

    mutation UpdateCompra($data: UpdateCompraInput!,$id:String!){
        updateCompra(updateCompraInput:$data,id:$id){
            _id
        }
    }

`

export const DELETE_COMPRA_MUTATION = gql`

    mutation DeleteCompra($id:String!){
        removeCompra(id:$id){
            _id
        }
    }

`