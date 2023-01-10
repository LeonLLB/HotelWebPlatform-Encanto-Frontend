import { gql } from "apollo-angular";
import { Cliente, Invitado } from "src/app/interfaces/alquiler.interface";
import { TipoHabitacion } from "src/app/interfaces/habitacion.interface";


export const CREATE_HABITACION_MUTATION = gql`

    mutation CreateHabitacion($habitacionInput: CreateHabitacionInput!){
        createHabitacion(createHabitacionInput: $habitacionInput) {
            id
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
            id
        }
    }

`

export const DELETE_HABITACION_MUTATION = gql`

    mutation DeleteHabitacion($id:String!){
        removeHabitacion(id: $id) {
            id
        }
    }

`

export const MANTENIMIENTO_HABITACION_MUTATION = gql`

    mutation MantenimientoHabitacion($id:String!,$data:MantenimientoHabitiacionInput!){
        mantenimientoHabitiacion(id: $id,mantenimientoHabitacionInput: $data) {
            id
        }
    }

`

export interface ArticuloUtilizadoInput {
    articuloId: string
    cantidad: number
}

export interface IArticulosUtilizadosInput {
    articulosUtilizados: ArticuloUtilizadoInput[]
}

export const ALQUILAR_HABITACION_MUTATION = gql`

    mutation AlquilarHabitacion($data:CreateAlquilerInput!){
        alquilar(alquilerInput: $data) {
            id
        }
    }

`

export interface AlquilerInput {
    habitacion: string
    costoDolar: number
    fechaInicio: string
    fechaFin: string
    procedencia: string
    cliente: Cliente
    invitados?: Invitado[]
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
            id
        }
    }

`

export const ELIMINAR_ALQUILER_MUTATION = gql`

    mutation EliminarAlquiler($id:String!){
        eliminarAlquiler(id: $id) {
            id
        }
    }

`

export const EXTENDER_O_CULMINAR_ALQUILER_MUTATION = gql`

    mutation ExtenderCulminarAlquiler($id:String!,$caso:String!){
        actualizarEstadoAlquiler(id: $id, caso: $caso) {
            id
        }
    }

`