import { gql, type TypedDocumentNode } from '@apollo/client'
import type { Category } from '@/types'

type ListCategoriesQueryData = {
  listCategories: Category[]
}

type ListCategoriesVariables = Record<string, never>

export const LIST_CATEGORIES: TypedDocumentNode<
  ListCategoriesQueryData,
  ListCategoriesVariables
> = gql`
  query ListCategories {
    listCategories {
      id
      name
      description
      icon
      color
      createdAt
      updatedAt
    }
  }
`
