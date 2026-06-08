import type { DashboardSummary } from '@/types'
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
          name
        }
        transactionCount
        totalAmount
      }
    }
  }
`
