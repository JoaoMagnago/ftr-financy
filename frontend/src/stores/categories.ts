import { create } from 'zustand'
import { apolloClient } from '@/lib/graphql/apollo'
import { LIST_CATEGORIES } from '@/lib/graphql/queries/Categories'
import type {
  CategoryListItem,
  CreateCategoryInput,
  UpdateCategoryInput,
} from '@/types'
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from '@/lib/graphql/mutations/Categories'

interface CategoriesState {
  categories: CategoryListItem[]
  loading: boolean
  loaded: boolean
  deleting: boolean
  createCategory: (data: CreateCategoryInput) => Promise<void>
  updateCategory: (id: string, data: UpdateCategoryInput) => Promise<void>
  deleteCategory: (id: string) => Promise<void>
  listCategories: () => Promise<void>
  reset: () => void
}

const initialState = {
  categories: [],
  loading: false,
  loaded: false,
  deleting: false,
}

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
  ...initialState,
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
        categories: [...state.categories, { ...category, transactionCount: 0 }],
      }))
    } catch (error) {
      console.error('Erro ao criar categoria')
      throw error
    }
  },
  updateCategory: async (id, categoryData) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_CATEGORY,
        variables: {
          updateCategoryId: id,
          updateCategoryData: categoryData,
        },
      })

      const category = data?.updateCategory

      if (!category) return

      set((state) => ({
        categories: state.categories.map((item) =>
          item.id === category.id
            ? {
                ...item,
                ...category,
              }
            : item,
        ),
      }))
    } catch (error) {
      console.error('Erro ao atualizar categoria')
      throw error
    }
  },
  deleteCategory: async (id) => {
    set({ deleting: true })

    try {
      await apolloClient.mutate({
        mutation: DELETE_CATEGORY,
        variables: {
          deleteCategoryId: id,
        },
      })

      set((state) => ({
        categories: state.categories.filter((category) => category.id !== id),
      }))
    } catch (error) {
      console.log('Erro ao excluir categoria')

      throw error
    } finally {
      set({ deleting: false })
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
  reset: () => set(initialState),
}))
