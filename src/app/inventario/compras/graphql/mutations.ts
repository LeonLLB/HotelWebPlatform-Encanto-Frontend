import { gql } from "apollo-angular";


export const CREATE_COMPRA_MUTATION = gql`

    mutation CreateCompra($data: CreateCompraInput!){
        createCompra(createCompraInput:$data){
            _id
        }
    }

`