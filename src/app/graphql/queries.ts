import { gql } from "apollo-angular";

export const VERIFY_USER_QUERY = gql`
    query Revalidate{
        revalidate {
            rol
        }
    }
`

export interface VerifyUserQueryResultInterface {
    rol: string
}