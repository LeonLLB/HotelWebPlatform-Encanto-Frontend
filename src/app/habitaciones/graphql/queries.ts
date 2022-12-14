import { gql } from "apollo-angular";
import { TipoHabitacion } from "src/app/interfaces/habitacion.interface";

export type EstadoHabitacion = 'D' | 'O' | 'M'

export const QUERY_HABITACIONES = gql`

    query Habitaciones($paginacion: PaginateInput,$doPaginate: Boolean){
        habitaciones(pagination:$paginacion,doPaginate:$doPaginate) {
            result {
                id
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
            id
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
            id
            numero
        }
    }

`

export const QUERY_CORE_HABITACIONES = gql`

    query HabiatcionesSimples($paginacion: PaginateInput,$doPaginate: Boolean){
        habitaciones(pagination:$paginacion,doPaginate:$doPaginate) {
            result {
                id
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
                id
                habitacion {
                    numero
                }
                costoDolar
                fechaInicio
                fechaFin
                procedencia
                cliente {
                    nombre
                    apellido
                    cedula
                    nacionalidad
                    tipoIdentidad
                    telefono
                }
                invitados {
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
                id
                numero
            }
            costoDolar
            fechaInicio
            fechaFin
            procedencia
            cliente {
                nombre
                apellido
                cedula
                telefono
                tipoIdentidad
                nacionalidad
            }
            invitados {
                nombre
                apellido
                cedula
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
            cliente {
                nombre
                apellido
                cedula
                tipoIdentidad
                nacionalidad
                telefono
            }
            invitados {
                nombre
                apellido
                cedula
            }
        }
        habitacion(id: $id) {
            id
            numero
            piso
            tipo
            caracteristicas
            estado
            imgUrl
        }
    }

`

export const QUERY_ALQUILERES_VENCIDOS_HOY = gql`

    query FetchAlquileresVencidosHoy($paginateInput:PaginateInput!){
        alquileresVencidosHoy(paginateInput:$paginateInput) {
            result {
                id
                fechaInicio
                fechaFin
                costoDolar
                procedencia
                cliente {
                    nombre
                    apellido
                    telefono  
                    tipoIdentidad
                    nacionalidad
                    cedula 
                }
                invitados {
                    nombre
                    apellido
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

export const QUERY_ALQUILERES_VENCIDOS_ANTERIORES = gql`

    query FetchAlquileresVencidosAnteriores($paginateInput:PaginateInput!){
        alquileresVencidosAnteriores(paginateInput:$paginateInput) {
            result {
                id
                fechaInicio
                fechaFin
                costoDolar
                cliente {
                    nombre
                    apellido
                    telefono   
                    cedula
                    tipoIdentidad
                    nacionalidad
                }
                invitados {
                    nombre
                    apellido
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