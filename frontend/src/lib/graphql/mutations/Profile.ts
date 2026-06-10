import type { UpdateProfileInput, User } from '@/types'
import { gql, type TypedDocumentNode } from '@apollo/client'

type UpdateProfileMutationData = {
  updateProfile: User
}

type UpdateProfileMutationVariables = {
  data: UpdateProfileInput
}

export const UPDATE_PROFILE: TypedDocumentNode<
  UpdateProfileMutationData,
  UpdateProfileMutationVariables
> = gql`
  mutation UpdateProfile($data: UpdateProfileInput!) {
    updateProfile(data: $data) {
      id
      name
      email
      updatedAt
    }
  }
`
