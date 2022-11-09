import { gql } from "apollo-angular";
import { TipoHabitacion } from "src/app/interfaces/habitacion.interface";

export type EstadoHabitacion = 'D' | 'O' | 'M'

export const QUERY_HABITACIONES = gql`

    query Habitaciones($filterHabitacionesInput: FilterHabitacionInput,$paginacion: PaginateInput!){
        habitaciones(filterHabitacionInput: $filterHabitacionesInput,pagination:$paginacion) {
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
    tipo?:TipoHabitacion
    caracteristica?:string
    estado?: EstadoHabitacion
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
