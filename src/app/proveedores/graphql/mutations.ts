import { gql } from "apollo-angular";


export const CREATE_PROVEEDOR_MUTATION = gql`

    mutation CreateProveedor($data: CreateProveedorInput!){
        createProveedor(createProveedorInput: $data){
            id
        }
    }

`

export const UPDATE_PROVEEDOR_MUTATION = gql`

    mutation UpdateProveedor($data: UpdateProveedorInput!, $id: String!){
        updateProveedor(updateProveedorInput: $data,id: $id){
            id
        }
    }

`

export const REMOVE_PROVEEDOR_MUTATION = gql`

    mutation RemoveProveedor($id: String!){
        removeProveedor(id: $id){
            id
        }
    }

`