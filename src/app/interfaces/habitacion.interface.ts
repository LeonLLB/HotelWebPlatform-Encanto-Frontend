import { EstadoHabitacion } from "../habitaciones/graphql/queries"

export type TipoHabitacion = 'Singular' | 'Matrimonial' | 'Doble Singular' | 'Singular - Matrimonial'

export interface Habitacion {
    _id: string
    numero: number
    piso: number
    tipo: TipoHabitacion
    caracteristicas?: string[]
    estado?:EstadoHabitacion
}