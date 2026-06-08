import type { Category } from './categories'
import type { Transaction } from './transactions'

export interface DashboardSummary {
  currentMonthRevenue?: number
  currentMonthExpense?: number
  latestTransactions?: Transaction[]
  transactionCount?: number
  categoryCount?: number
  balance?: number
  mostUsedCategory?: CategoryStatistics | null
}

export interface CategoryStatistics {
  category: Category
  transactionCount: number
  totalAmount: number
}
