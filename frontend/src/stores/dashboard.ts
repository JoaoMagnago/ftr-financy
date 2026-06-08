import { create } from 'zustand'

import { apolloClient } from '@/lib/graphql/apollo'

import type { DashboardSummary } from '@/types'
import { DASHBOARD_SUMMARY_QUERY } from '@/lib/graphql/queries/Dashboard'

interface DashboardState {
  dashboardSummary: DashboardSummary | null
  loading: boolean
  getDashboardSummary: () => Promise<void>
}

export const useDashboardStore = create<DashboardState>((set) => ({
  dashboardSummary: null,
  loading: false,
  getDashboardSummary: async () => {
    set({ loading: true })

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
      set({ loading: false })
    }
  },
}))
