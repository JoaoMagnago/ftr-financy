import type { AuthPayload, RegisterInput } from '@/types'
import { gql, type TypedDocumentNode } from '@apollo/client'

type RegisterMutationData = {
  register: AuthPayload
}

type RegisterMutationVariables = {
  data: RegisterInput
}

export const REGISTER: TypedDocumentNode<
  RegisterMutationData,
  RegisterMutationVariables
> = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
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
