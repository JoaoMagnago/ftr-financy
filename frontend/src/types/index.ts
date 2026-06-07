export interface User {
  id: string
  name: string
  email: string
  role?: string
  createdAt?: string
  updatedAt?: string
}

export interface RegisterInput {
  name: string
  email: string
  password: string
}

export interface LoginInput {
  email: string
  password: string
}

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

export enum CategoryIcon {
  BRIEFCASE = 'BRIEFCASE',
  CAR = 'CAR',
  HEALTH = 'HEALTH',
  PIGGY_BANK = 'PIGGY_BANK',
  SHOPPING_CART = 'SHOPPING_CART',
  TICKET = 'TICKET',
  TOOLS = 'TOOLS',
  FOOD = 'FOOD',
  PET = 'PET',
  HOUSE = 'HOUSE',
  GIFT = 'GIFT',
  EXERCISE = 'EXERCISE',
  BOOK = 'BOOK',
  BAGGAGE = 'BAGGAGE',
  MAIL = 'MAIL',
  RECEIPT = 'RECEIPT',
}

export enum CategoryColor {
  GREEN = 'GREEN',
  BLUE = 'BLUE',
  PURPLE = 'PURPLE',
  PINK = 'PINK',
  RED = 'RED',
  ORANGE = 'ORANGE',
  YELLOW = 'YELLOW',
}
export interface Category {
  id: string
  name: string
  icon: CategoryIcon
  color: string
  description?: string
  createdAt: string
  updatedAt: string
}

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

export interface PaginatedTransactions {
  items: Transaction[]
  total: number
  page: number
  limit: number
  pages: number
}
