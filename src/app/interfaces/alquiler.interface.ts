import { Habitacion } from "./habitacion.interface"

interface ClienteCore {
    nombre:string
    apellido:string
    telefono:string
}

export interface Cliente extends ClienteCore {
    cedula:number
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
    clientePrincipal: Cliente
    clientesSecundarios?: Cliente[]
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
    telefono:string[]
    cedula:string[] | number[]
}

export interface Alquiler extends AlquilerCore{
    _id: string
    costoDolar: number
    habitacion:Habitacion
    clientePrincipal: Cliente
    clientesSecundarios?:Cliente[]
    createdAt: string
    updatedAt: string
}