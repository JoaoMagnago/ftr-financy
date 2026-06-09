import type { Category, CreateCategoryInput } from '@/types'
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
