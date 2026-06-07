import { create } from 'zustand'
import type { ListTransactionsInput, Transaction } from '@/types'
import { apolloClient } from '@/lib/graphql/apollo'
import { LIST_TRANSACTIONS } from '@/lib/graphql/queries/Transactions'

type TransactionsFilters = Partial<ListTransactionsInput> & {
  page: number
  limit: number
}

interface TransactionsState {
  transactions: Transaction[]
  filters: TransactionsFilters
  loading: boolean
  total: number
  page: number
  pages: number
  setFilters: (filters: Partial<ListTransactionsInput>) => void
  listTransactions: (data: ListTransactionsInput) => Promise<void>
}

export const useTransactionsStore = create<TransactionsState>((set) => ({
  transactions: [],
  filters: {
    page: 1,
    limit: 10,
  },
  loading: false,
  page: 0,
  total: 0,
  pages: 0,
  setFilters: (newFilters) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    }))
  },
  listTransactions: async (filters) => {
    set({ loading: true })

    try {
      const { data } = await apolloClient.query({
        query: LIST_TRANSACTIONS,
        variables: {
          filters: filters,
        },
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
}))
