import type { ListTransactionsInput, PaginatedTransactions } from '@/types'
import { gql } from '@apollo/client'
import type { TypedDocumentNode } from '@apollo/client'

type ListTransactionsQueryData = {
  listTransactions: PaginatedTransactions
}

type ListTransactionsVariables = {
  filters: ListTransactionsInput
}

export const LIST_TRANSACTIONS: TypedDocumentNode<
  ListTransactionsQueryData,
  ListTransactionsVariables
> = gql`
  query ListTransactions($filters: ListTransactionsInput!) {
    listTransactions(data: $filters) {
      items {
        id
        type
        amount
        description
        date
        category {
          id
          name
          color
          icon
        }
        createdAt
      }
      total
      page
      limit
      pages
    }
  }
`
