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

export enum TransactionType {
  EXPENSE,
  REVENUE,
}

export enum CategoryIcon {
  BRIEFCASE,
  CAR,
  HEALTH,
  PIGGY_BANK,
  SHOPPING_CART,
  TICKET,
  TOOLS,
  FOOD,
  PET,
  HOUSE,
  GIFT,
  EXERCISE,
  BOOK,
  BAGGAGE,
  MAIL,
  RECEIPT,
}
