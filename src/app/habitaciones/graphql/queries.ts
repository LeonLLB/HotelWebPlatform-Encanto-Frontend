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

export interface FilterHabitacionInput {
    numero?: number
    piso?: number
    tipo?: TipoHabitacion | ''
    caracteristica?: string
    estado?: EstadoHabitacion | ''
}

export interface PaginateInput {
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

export const QUERY_CORE_HABITACIONES = gql`

    query HabiatcionesSimples($filterHabitacionesInput: FilterHabitacionInput,$paginacion: PaginateInput,$doPaginate: Boolean){
        habitaciones(filterHabitacionInput: $filterHabitacionesInput,pagination:$paginacion,doPaginate:$doPaginate) {
            result {
                _id
                numero
            }
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

export const QUERY_ALQUILERES = gql`

    query FetchAlquileres($paginacion: PaginateInput!){
        alquileres(paginateInput:$paginacion) {
            result {
                _id
                habitacion {
                    numero
                }
                costoDolar
                fechaInicio
                fechaFin
                procedencia
                clientePrincipal {
                    nombre
                    apellido
                }
                clientesSecundarios {
                    nombre
                    apellido
                }
                createdAt
                updatedAt
            }
            pages
            total
        }
    }

`

export const QUERY_ALQUILER = gql`

    query FetchAlquiler($id: String!){
        alquiler(id: $id) {
            habitacion {
                _id
                numero
            }
            costoDolar
            fechaInicio
            fechaFin
            procedencia
            clientePrincipal {
                nombre
                apellido
                cedula
                telefono
            }
            clientesSecundarios {
                nombre
                apellido
                cedula
                telefono
            }
        }
    }

`

export const QUERY_FULL_ALQUILER = gql`

    query FetchFullAlquiler($id: String!){
        alquiler(id: $id,queryBy:"habitacion") {            
            costoDolar
            fechaInicio
            fechaFin
            procedencia
            clientePrincipal {
                nombre
                apellido
                cedula
                telefono
            }
            clientesSecundarios {
                nombre
                apellido
                cedula
                telefono
            }
        }
        habitacion(id: $id) {
            _id
            numero
            piso
            tipo
            caracteristicas
            estado
            imgUrl
        }
    }

`

export const QUERY_ALQUILERES_VENCIDOS = gql`

    query FetchAlquileresVencidos($paginateInput:PaginateInput!){
        alquileresVencidosHoy(paginateInput:$paginateInput) {
            result {
                _id
                fechaInicio
                fechaFin
                costoDolar
                clientePrincipal {
                    nombre
                    apellido
                    telefono  
                    cedula 
                }
                clientesSecundarios {
                    nombre
                    apellido
                    telefono
                    cedula
                }
                habitacion {
                    numero
                }
            }
            pages
            total
        }
        alquileresVencidosAnteriores(paginateInput:$paginateInput) {
            result {
                _id
                fechaInicio
                fechaFin
                costoDolar
                clientePrincipal {
                    nombre
                    apellido
                    telefono   
                    cedula
                }
                clientesSecundarios {
                    nombre
                    apellido
                    telefono
                    cedula
                }
                habitacion {
                    numero
                }
            }
            pages
            total
        }
    }

`