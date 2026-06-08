import { gql, type TypedDocumentNode } from '@apollo/client'
import type { CreateTransactionInput, Transaction } from '@/types'

type CreateTransactionMutationData = {
  createTransaction: Transaction
}

type CreateTransactionMutationVariables = {
  data: CreateTransactionInput
}

export const CREATE_TRANSACTION: TypedDocumentNode<
  CreateTransactionMutationData,
  CreateTransactionMutationVariables
> = gql`
  mutation CreateTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
      id
      type
      date
      description
      amount
      category {
        id
        name
      }
      createdAt
    }
  }
`
