import type { AuthPayload, LoginInput } from '@/types'
import { gql, type TypedDocumentNode } from '@apollo/client'

type LoginMutationData = {
  login: AuthPayload
}

type LoginMutationVariables = {
  data: LoginInput
}

export const LOGIN: TypedDocumentNode<
  LoginMutationData,
  LoginMutationVariables
> = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      token
      refreshToken
      user {
        id
        name
        email
        createdAt
        updatedAt
      }
    }
  }
`
