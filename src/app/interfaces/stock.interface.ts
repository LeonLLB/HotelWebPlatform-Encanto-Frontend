import { Articulo } from "./articulo.interface";

export interface Stock {

    id: number;  
  
    stockActual: number
  
    updatedAt: string;  

    articulo: Articulo
}