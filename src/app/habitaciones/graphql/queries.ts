import { gql } from "apollo-angular";
import { TipoHabitacion } from "src/app/interfaces/habitacion.interface";

export type EstadoHabitacion = 'D' | 'O' | 'M'

export const QUERY_HABITACIONES = gql`

    query Habitaciones($filterHabitacionesInput: FilterHabitacionInput,$paginacion: PaginateInput,$doPaginate: Boolean){
        habitaciones(filterHabitacionInput: $filterHabitacionesInput,pagination:$paginacion,doPaginate:$doPaginate) {
            result {
                _id
                numero
                piso
                tipo
                caracteristicas
                estado
            }
            pages
            total
        }
    }

`

export interface FilterHabitacionInput{
    numero?:number
    piso?:number
    tipo?:TipoHabitacion | ''
    caracteristica?:string
    estado?: EstadoHabitacion | ''
}

export interface PaginateInput{
    limit?: number
    offset?: number
}

export const QUERY_HABITACION = gql`

    query Habitacion($id: String!){
        habitacion(id: $id) {
            _id
            numero
            piso
            tipo            
            caracteristicas
        }
    }

`

export const QUERY_CORE_HABITACION = gql`

    query HabitacionsSimple($id: String!){
        habitacion(id: $id) {
            _id
            numero
        }
    }

`

export const GET_CARACTERISTICAS_QUERY = gql`

    query GetCaracteristicas{
        caracteristicas{
            caracteristicas
        }
    }

`
