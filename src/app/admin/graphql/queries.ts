import { gql } from "apollo-angular";


export const GET_USER_QUERY =  gql`

    query GetUser($id:String!){
        user(id: $id) {
            id
            nombre
            apellido
            cedula
            cargo            
        }
    }

`

export const GET_USERS_QUERY = gql`

    query GetUsers{
        users {
            id
            nombre
            apellido
            cedula
            cargo
        }
    }

`
