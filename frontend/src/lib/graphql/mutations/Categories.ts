import type {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from '@/types'
import { gql, type TypedDocumentNode } from '@apollo/client'

type CreateCategoryMutationData = {
  createCategory: Category
}

type CreateCategoryMutationVariables = {
  createCategoryData: CreateCategoryInput
}

export const CREATE_CATEGORY: TypedDocumentNode<
  CreateCategoryMutationData,
  CreateCategoryMutationVariables
> = gql`
  mutation CreateCategory($createCategoryData: CreateCategoryInput!) {
    createCategory(data: $createCategoryData) {
      id
      name
      description
      icon
      color
      createdAt
    }
  }
`

type UpdateCategoryMutationData = {
  updateCategory: Category
}

type UpdateCategoryMutationVariables = {
  updateCategoryId: string
  updateCategoryData: UpdateCategoryInput
}

export const UPDATE_CATEGORY: TypedDocumentNode<
  UpdateCategoryMutationData,
  UpdateCategoryMutationVariables
> = gql`
  mutation UpdateCategory(
    $updateCategoryId: String!
    $updateCategoryData: UpdateCategoryInput!
  ) {
    updateCategory(id: $updateCategoryId, data: $updateCategoryData) {
      id
      name
      description
      icon
      color
      updatedAt
    }
  }
`
