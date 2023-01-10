

export interface Articulo{
    id:string
    nombre:string
    tipo:'Lenceria' | 'Limpieza'
    mesesUtiles?:number
}