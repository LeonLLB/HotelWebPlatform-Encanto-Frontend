import { gql } from "apollo-angular";


export const QUERY_PROVEEDORES = gql`

    query GetProveedores($paginacion: PaginateInput!){
        proveedores(pagination:$paginacion){
            result{
                _id
                nombre
                rif
                direccion
                contacto{
                    nombre
                    apellido
                    telefono
                }
            }
            pages
            total
        }
    }

`

export const QUERY_PROVEEDORES_CORE = gql`

    query GetProveedoresCore(){
        proveedores(doPaginate: true){
            result{
                _id
                nombre
            }
        }
    }

`

export const QUERY_PROVEEDOR = gql`

    query GetProveedor($id: String!){
        proveedor(id:$id){
            _id
            nombre
            rif
            direccion
            contacto{
                nombre
                apellido
                telefono
            }
        }
    }

`