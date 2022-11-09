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

export interface ICreateHabitacionInput{
    habitacionInput: HabitacionInput
}