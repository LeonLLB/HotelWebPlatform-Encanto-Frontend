
interface ClienteCore {
    nombre:string
    apellido:string
    telefono:string
}

export interface Cliente extends ClienteCore {
    cedula:number
}

interface AlquilerCore{
    habitacion:string
    procedencia:string,
    fechaInicio: string,
    fechaFin: string
}

export interface AlquilerInputData extends AlquilerCore{
    costoDolar: number,
    clientePrincipal: Cliente
    clientesSecundarios?: Cliente[]
}


export interface AlquilerFormData extends AlquilerCore{
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
