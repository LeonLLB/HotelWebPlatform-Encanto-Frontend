import { gql } from "apollo-angular";
import { ValidRoles } from "src/app/interfaces/user.interface";

export interface IUserInput {
    nombre: string
    apellido: string
    cedula: number
    cargo: ValidRoles
}

export const CREATE_USER_MUTATION = gql`

    mutation CreateUser($createUserInput: CreateUserInput!){
        createUser(createUserInput: $createUserInput) {
            _id,
            password          
        }
    }

`

export interface ICreateUserInput {
    createUserInput: IUserInput
}

export const UPDATE_USER_MUTATION = gql`

    mutation UpdateUser($updateUserInput: UpdateUserInput!,$id: String!){
        updateUser(id:$id,updateUserInput: $updateUserInput) {
            _id  
        }
    }

`
export interface IUpdateUserInput {
    updateUserInput: IUserInput,
    id:string
}

export const UPDATE_USER_PASSWORD_MUTATION = gql`

    mutation ChangeUserPassword($id:String!){
        updateUserPassword(id: $id) {
            password
        }
    }

`

export const DELETE_USER_MUTATION = gql`

    mutation DeleteUser($id:String!){
        removeUser(id: $id) {
            _id
        }
    }

`