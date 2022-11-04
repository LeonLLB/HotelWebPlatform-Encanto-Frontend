import { gql } from "apollo-angular";


export const GET_USER_QUERY =  gql`

    query GetUser($id:String!){
        user(id: $id) {
            _id
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
            _id
            nombre
            apellido
            cedula
            cargo
        }
    }

`
