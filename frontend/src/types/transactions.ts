import type { Category } from './categories'

export enum TransactionType {
  EXPENSE = 'EXPENSE',
  REVENUE = 'REVENUE',
}

export interface ListTransactionsInput {
  page: number
  limit: number
  description?: string
  type?: TransactionType
  categoryId?: string
  month?: number
  year?: number
}

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  description: string | null

  userId?: string
  categoryId?: string

  category?: Category

  date: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateTransactionInput {
  type: TransactionType
  amount: number
  categoryId: string
  description?: string
  date: string
}

export interface PaginatedTransactions {
  items: Transaction[]
  total: number
  page: number
  limit: number
  pages: number
}

export interface MonthOption {
  value: string
  month?: number
  year?: number
  label: string
}
