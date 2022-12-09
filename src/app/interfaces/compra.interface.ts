import { Articulo } from "./articulo.interface"

interface CompraCore{
    proveedor: string
    fechaCompra: string 
    baseImponible: number
    exento: number
    porcentajeIVA: number
}

export interface CompraFromForm extends Partial<{
    fechaCompra: string | null;
    proveedor: string | null;
    baseImponible: number | null;
    exento: number | null;
    porcentajeIVA: number | null;
    articulos: (string | null)[];
    cantidades: (string | null)[];
}>{}

export interface Compra extends CompraCore{
    _id: string        
    articulosComprados: {articulo: Articulo, cantidad: number}[]
}

export interface CompraDTO extends CompraCore{
    
    articulosComprados: {articulo: string, cantidad: number}[]
}