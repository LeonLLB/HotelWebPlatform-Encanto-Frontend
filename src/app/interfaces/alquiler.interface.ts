import { Habitacion } from "./habitacion.interface"

interface ClienteCore {
    nombre:string
    apellido:string
    telefono:string
    nacionalidad:string
    tipoIdentidad: 'V' | 'P'
}

interface InvitadoCore {
    nombre:string
    apellido:string
}

export interface Cliente extends ClienteCore {
    cedula:number
}
export interface Invitado extends InvitadoCore {
    cedula?:number
}

interface AlquilerWithHabitacionId{
    habitacion:string
}

interface AlquilerCore{
    procedencia:string,
    fechaInicio: string,
    fechaFin: string
}

export interface AlquilerInputData extends AlquilerCore, AlquilerWithHabitacionId{
    costoDolar: number,
    cliente: Cliente
    invitados?: Invitado[]
}


export interface AlquilerFormData extends AlquilerCore, AlquilerWithHabitacionId{
    costoDolar: string | number,
}

export interface ClienteFormData extends ClienteCore{
    cedula:string | number
}

export interface InvitadosFormData{
    nombre:string[]
    apellido:string[]
    cedula:string[] | number[]
}

export interface Alquiler extends AlquilerCore{
    _id: string
    costoDolar: number
    habitacion:Habitacion
    cliente: Cliente
    invitados?:Invitado[]
    createdAt: string
    updatedAt: string
}