export interface User{
    id?:number,
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