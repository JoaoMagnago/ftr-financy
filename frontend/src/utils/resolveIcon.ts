import { CategoryIcon } from '@/types'
import type { LucideIcon } from 'lucide-react'
import {
  BriefcaseBusiness,
  HeartPulse,
  PiggyBank,
  ShoppingCart,
  Ticket,
  PawPrint,
  House,
  Gift,
  Dumbbell,
  BookOpen,
  BaggageClaim,
  Mail,
  CarFront,
  Utensils,
  ToolCase,
  ReceiptText,
} from 'lucide-react'

const categoryIcons: Record<CategoryIcon, LucideIcon> = {
  [CategoryIcon.BRIEFCASE]: BriefcaseBusiness,
  [CategoryIcon.CAR]: CarFront,
  [CategoryIcon.HEALTH]: HeartPulse,
  [CategoryIcon.PIGGY_BANK]: PiggyBank,
  [CategoryIcon.SHOPPING_CART]: ShoppingCart,
  [CategoryIcon.TICKET]: Ticket,
  [CategoryIcon.TOOLS]: ToolCase,
  [CategoryIcon.FOOD]: Utensils,
  [CategoryIcon.PET]: PawPrint,
  [CategoryIcon.HOUSE]: House,
  [CategoryIcon.GIFT]: Gift,
  [CategoryIcon.EXERCISE]: Dumbbell,
  [CategoryIcon.BOOK]: BookOpen,
  [CategoryIcon.BAGGAGE]: BaggageClaim,
  [CategoryIcon.MAIL]: Mail,
  [CategoryIcon.RECEIPT]: ReceiptText,
}

export const resolveIcon = (icon: CategoryIcon): LucideIcon =>
  categoryIcons[icon]
