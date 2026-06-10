import { create } from 'zustand'
import type {
  CreateTransactionInput,
  ListTransactionsInput,
  Transaction,
  UpdateTransactionInput,
} from '@/types'
import { apolloClient } from '@/lib/graphql/apollo'
import { LIST_TRANSACTIONS } from '@/lib/graphql/queries/Transactions'
import {
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION,
} from '@/lib/graphql/mutations/Transactions'

type TransactionsFilters = Partial<ListTransactionsInput> & {
  page: number
  limit: number
}

interface TransactionsState {
  transactions: Transaction[]
  filters: TransactionsFilters
  loading: boolean
  deleting: boolean
  total: number
  page: number
  pages: number
  setFilters: (filters: Partial<ListTransactionsInput>) => void
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  updateTransaction: (id: string, data: UpdateTransactionInput) => Promise<void>
  deleteTransaction: (id: string) => Promise<void>
  listTransactions: (data: ListTransactionsInput) => Promise<void>
  reset: () => void
}

const initialState = {
  transactions: [],
  filters: {
    page: 1,
    limit: 10,
  },
  loading: false,
  deleting: false,
  page: 0,
  total: 0,
  pages: 0,
}

export const useTransactionsStore = create<TransactionsState>((set, get) => ({
  ...initialState,
  setFilters: (newFilters) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    }))
  },
  createTransaction: async (transactionData) => {
    try {
      await apolloClient.mutate({
        mutation: CREATE_TRANSACTION,
        variables: {
          data: transactionData,
        },
      })

      await get().listTransactions(get().filters)
    } catch (error) {
      console.log('Erro ao criar transação')
      throw error
    }
  },
  updateTransaction: async (id, transactionData) => {
    try {
      await apolloClient.mutate({
        mutation: UPDATE_TRANSACTION,
        variables: {
          updateTransactionId: id,
          updateTransactionData: transactionData,
        },
      })

      await get().listTransactions(get().filters)
    } catch (error) {
      console.log('Erro ao atualizar transação')
      throw error
    }
  },
  deleteTransaction: async (id) => {
    set({ deleting: true })

    try {
      await apolloClient.mutate({
        mutation: DELETE_TRANSACTION,
        variables: {
          deleteTransactionId: id,
        },
      })

      await get().listTransactions(get().filters)
    } catch (error) {
      console.log('Erro ao excluir transação')

      throw error
    } finally {
      set({ deleting: false })
    }
  },
  listTransactions: async (filters) => {
    set({ loading: true })

    try {
      const { data } = await apolloClient.query({
        query: LIST_TRANSACTIONS,
        variables: {
          filters,
        },
        fetchPolicy: 'network-only',
      })

      const transactions = data?.listTransactions

      if (!transactions) return

      const { items, page, total, pages } = data.listTransactions
      set({
        transactions: items,
        page,
        total,
        pages,
      })
    } catch (error) {
      console.log('Erro ao fazer buscar transações')
      throw error
    } finally {
      set({ loading: false })
    }
  },
  reset: () => set(initialState),
}))
