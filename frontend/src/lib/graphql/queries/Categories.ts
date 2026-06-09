import { gql, type TypedDocumentNode } from '@apollo/client'
import type { CategoryListItem } from '@/types'

type ListCategoriesQueryData = {
  listCategories: CategoryListItem[]
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
      transactionCount
      createdAt
      updatedAt
    }
  }
`
