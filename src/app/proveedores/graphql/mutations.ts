import { gql } from "apollo-angular";


export const CREATE_PROVEEDOR_MUTATION = gql`

    mutation CreateProveedor($data: CreateProveedorInput!){
        createProveedor(createProveedorInput: $data){
            _id
        }
    }

`