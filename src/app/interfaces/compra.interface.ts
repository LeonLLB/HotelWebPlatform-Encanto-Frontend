import { Articulo } from "./articulo.interface"
import { Proveedor } from "./proveedor.interface"

interface CompraCore{
    fechaCompra: string 
    baseImponible: number
    exento: number
    porcentajeIVA: number
}

export interface CompraFromForm extends Partial<{
    fechaCompra: string | null;
    proveedor: string | null;
    baseImponible: number | null | string;
    exento: number | null | string;
    porcentajeIVA: number | null;
    articulos: (string | null)[];
    cantidades: (string | null)[];
}>{}

export interface Compra extends CompraCore{
    id: string        
    articulosComprados: {articulo: Articulo, cantidad: number}[]
    proveedor: Proveedor
}

export interface CompraDTO extends CompraCore{    
    proveedor: string
    articulosComprados: {articulo: string, cantidad: number}[]
}