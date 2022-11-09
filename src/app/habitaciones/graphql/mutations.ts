import { gql } from "apollo-angular";
import { TipoHabitacion } from "src/app/interfaces/habitacion.interface";


export const CREATE_HABITACION_MUTATION = gql`

    mutation CreateHabitacion($habitacionInput: CreateHabitacionInput!){
        createHabitacion(createHabitacionInput: $habitacionInput) {
            _id
        }
    }

`

export interface HabitacionInput {
    numero: number
    piso: number
    tipo: TipoHabitacion
    caracteristicas?: string[]
}

export interface IHabitacionInput{
    habitacionInput: HabitacionInput
}

export const UPDATE_HABITACION_MUTATION = gql`

    mutation UpdateHabitacion($habitacionInput: UpdateHabitacionInput!,$id:String!){
        updateHabitacion(updateHabitacionInput: $habitacionInput,id:$id) {
            _id
        }
    }

`

export const DELETE_HABITACION_MUTATION = gql`

    mutation DeleteHabitacion($id:String!){
        removeHabitacion(id: $id) {
            _id
        }
    }

`