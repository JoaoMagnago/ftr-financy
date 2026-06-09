import { create } from 'zustand'

import { apolloClient } from '@/lib/graphql/apollo'

import type { CategoryStatistics, DashboardSummary } from '@/types'
import {
  CATEGORIES_STATISTICS_QUERY,
  DASHBOARD_SUMMARY_QUERY,
} from '@/lib/graphql/queries/Dashboard'

interface DashboardState {
  dashboardSummary: DashboardSummary | null
  loadingDashboard: boolean
  categoriesStatistics: CategoryStatistics[]
  loadingStatistics: boolean
  getDashboardSummary: () => Promise<void>
  getCategoriesStatistics: () => Promise<void>
}

export const useDashboardStore = create<DashboardState>((set) => ({
  dashboardSummary: null,
  loadingDashboard: false,
  categoriesStatistics: [],
  loadingStatistics: false,
  getDashboardSummary: async () => {
    set({ loadingDashboard: true })

    try {
      const { data } = await apolloClient.query({
        query: DASHBOARD_SUMMARY_QUERY,
        fetchPolicy: 'network-only',
      })

      if (!data?.dashboardSummary) return

      set({
        dashboardSummary: data.dashboardSummary,
      })
    } catch (error) {
      console.log('Erro ao fazer buscar informações do dashboard')
      throw error
    } finally {
      set({ loadingDashboard: false })
    }
  },
  getCategoriesStatistics: async () => {
    set({ loadingStatistics: true })

    try {
      const { data } = await apolloClient.query({
        query: CATEGORIES_STATISTICS_QUERY,
        fetchPolicy: 'network-only',
      })

      if (!data?.categoriesStatistics) return

      set({
        categoriesStatistics: data.categoriesStatistics,
      })
    } finally {
      set({ loadingStatistics: false })
    }
  },
}))
