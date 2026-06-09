import { create } from 'zustand'
import { apolloClient } from '@/lib/graphql/apollo'
import { LIST_CATEGORIES } from '@/lib/graphql/queries/Categories'
import type { Category, CreateCategoryInput } from '@/types'
import { CREATE_CATEGORY } from '@/lib/graphql/mutations/Categories'

interface CategoriesState {
  categories: Category[]
  loading: boolean
  loaded: boolean
  listCategories: () => Promise<void>
  createCategory: (data: CreateCategoryInput) => Promise<void>
}

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
  categories: [],
  loading: false,
  loaded: false,
  createCategory: async (categoryData) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_CATEGORY,
        variables: {
          createCategoryData: categoryData,
        },
      })

      const category = data?.createCategory

      if (!category) return

      set((state) => ({
        categories: [...state.categories, category],
      }))
    } catch (error) {
      console.error('Erro ao criar categoria')
      throw error
    }
  },
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
