export interface User{
    id?:number,
    nombre:string,
    apellido:string,
    cedula:number,
    password?:string,
    cargo: 'A' | 'R' | ''
}