import { Articulo } from "./articulo.interface"
import { Proveedor } from "./proveedor.interface"

interface CompraCore{
    fechaCompra: string 
}

export interface CompraFromForm extends Partial<{
    fechaCompra: string | null;
    proveedor: string | null;
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