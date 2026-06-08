import { create } from 'zustand'
import { apolloClient } from '@/lib/graphql/apollo'
import { LIST_CATEGORIES } from '@/lib/graphql/queries/Categories'
import type { Category } from '@/types'

interface CategoriesState {
  categories: Category[]
  loading: boolean
  loaded: boolean
  listCategories: () => Promise<void>
}

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
  categories: [],
  loading: false,
  loaded: false,
  listCategories: async () => {
    if (get().loaded) return

    set({ loading: true })

    try {
      const { data } = await apolloClient.query({
        query: LIST_CATEGORIES,
        fetchPolicy: 'network-only',
      })

      if (!data?.listCategories) return

      set({
        categories: data?.listCategories,
        loaded: true,
      })
    } catch (error) {
      console.log('Erro ao fazer buscar transações')
      throw error
    } finally {
      set({ loading: false })
    }
  },
}))
