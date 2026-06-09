import type { CategoryStatistics, DashboardSummary } from '@/types'
import { gql, type TypedDocumentNode } from '@apollo/client'

type DashboardSummaryQueryData = {
  dashboardSummary: DashboardSummary
}

type DashboardSummaryVariables = Record<string, never>

export const DASHBOARD_SUMMARY_QUERY: TypedDocumentNode<
  DashboardSummaryQueryData,
  DashboardSummaryVariables
> = gql`
  query DashboardSummary {
    dashboardSummary {
      currentMonthExpense
      currentMonthRevenue
      latestTransactions {
        id
        description
        amount
        type
        category {
          id
          name
          icon
          color
        }
        createdAt
      }
      categoryCount
      transactionCount
      balance
      mostUsedCategory {
        category {
          id
          name
          color
          icon
        }
        transactionCount
        totalAmount
      }
    }
  }
`

type CategoriesStatisticsQueryData = {
  categoriesStatistics: CategoryStatistics[]
}

type CategoriesStatisticsVariables = Record<string, never>

export const CATEGORIES_STATISTICS_QUERY: TypedDocumentNode<
  CategoriesStatisticsQueryData,
  CategoriesStatisticsVariables
> = gql`
  query CategoriesStatistics {
    categoriesStatistics {
      category {
        id
        name
        color
      }
      totalAmount
      transactionCount
    }
  }
`
