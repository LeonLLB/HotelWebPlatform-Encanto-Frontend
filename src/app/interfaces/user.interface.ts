export interface User{
    _id?:string,
    nombre:string,
    apellido:string,
    cedula:number,
    password?:string,
    cargo: ValidRoles
}

export enum ValidRoles {
    admin = 'A',
    recepcionista = 'R',
    null = ''
}