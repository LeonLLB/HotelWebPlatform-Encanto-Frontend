import { Injectable } from '@angular/core';
import { ApolloQueryResult, TypedDocumentNode } from '@apollo/client/core';
import { Apollo, gql, MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';

// const TEST_QUERY = gql`  
//     query login(loginInput:$loginInputData){
//       _id
//       nombre
//       apellido
//       rol
//       token
//     }
// `

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(
    private apollo: Apollo
  ) { }

  query<ResponseType, RequestBodyType>(GQLQuery: TypedDocumentNode<unknown, unknown>,RequestBody:RequestBodyType | undefined = undefined): Observable<ApolloQueryResult<ResponseType>>{
    return this.apollo.query<ResponseType,RequestBodyType>({
      query: GQLQuery,
      variables:RequestBody,      
    })
  }

  mutate<ResponseType, RequestBodyType>(GQLMutation: TypedDocumentNode<unknown, unknown>,RequestBody:RequestBodyType): Observable<MutationResult<ResponseType>>{
    return this.apollo.mutate<ResponseType,RequestBodyType>({
      mutation: GQLMutation,
      variables:RequestBody
    })
  }
}
