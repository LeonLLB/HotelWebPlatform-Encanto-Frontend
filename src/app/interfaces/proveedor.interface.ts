

export interface ProveedorInput{
    nombre:string
    rif:string
    direccion:string
    contacto: ContactoInput
}

interface ContactoInput{
    nombre: string
    apellido: string
    telefono: string
}

export interface Proveedor extends ProveedorInput{
    id: string
}