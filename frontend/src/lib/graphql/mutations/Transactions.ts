import { gql, type TypedDocumentNode } from '@apollo/client'
import type {
  CreateTransactionInput,
  Transaction,
  UpdateTransactionInput,
} from '@/types'

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
type UpdateTransactionMutationData = {
  updateTransaction: Transaction
}

type UpdateTransactionMutationVariables = {
  updateTransactionData: UpdateTransactionInput
  updateTransactionId: string
}

export const UPDATE_TRANSACTION: TypedDocumentNode<
  UpdateTransactionMutationData,
  UpdateTransactionMutationVariables
> = gql`
  mutation UpdateTransaction(
    $updateTransactionId: String!
    $updateTransactionData: UpdateTransactionInput!
  ) {
    updateTransaction(id: $updateTransactionId, data: $updateTransactionData) {
      id
      type
      date
      description
      amount
      category {
        id
        name
      }
      updatedAt
    }
  }
`
