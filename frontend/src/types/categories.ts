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

export interface CreateCategoryInput {
  name: string
  description?: string
  icon: CategoryIcon
  color: string
}

export type UpdateCategoryInput = Partial<CreateCategoryInput>
