import { gql } from "apollo-angular";
import { Cliente } from "src/app/interfaces/alquiler.interface";
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

export const ALQUILAR_HABITACION_MUTATION = gql`

    mutation AlquilarHabitacion($data:CreateAlquilerInput!){
        alquilar(alquilerInput: $data) {
            _id
        }
    }

`

export interface AlquilerInput {
    habitacion: string
    costoDolar: number
    fechaInicio: string
    fechaFin: string
    procedencia: string
    clientePrincipal: Cliente
    clientesSecundarios?: Cliente[]
}

export interface IAlquilerInput{
    data: AlquilerInput
}

export interface IAlquilerUpdateInput{
    data: AlquilerInput,
    id: string,
    motivo: string,
}

export const ACTUALIZAR_ALQUILER_MUTATION = gql`

    mutation ActualizarAlquiler($id: String!,$data:UpdateAlquilerInput!,$motivo:String!){
        updateAlquiler(id: $id, alquilerInput: $data, motivoActualizacion: $motivo) {
            _id
        }
    }

`