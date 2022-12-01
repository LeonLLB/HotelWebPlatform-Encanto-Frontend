

export interface Articulo{
    _id:string
    nombre:string
    tipo:'Lenceria' | 'Limpieza'
    mesesUtiles?:number
}