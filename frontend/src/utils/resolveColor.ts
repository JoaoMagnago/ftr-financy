import { CategoryColor } from '@/types'

export type ResolveColorsOutput = {
  darkText: string
  baseText: string
  lightBg: string
}

const categoryColors: Record<CategoryColor, ResolveColorsOutput> = {
  [CategoryColor.GREEN]: {
    darkText: 'text-(--green-dark)',
    baseText: 'text-(--green-base)',
    lightBg: 'bg-(--green-light)',
  },

  [CategoryColor.BLUE]: {
    darkText: 'text-(--blue-dark)',
    baseText: 'text-(--blue-base)',
    lightBg: 'bg-(--blue-light)',
  },

  [CategoryColor.PURPLE]: {
    darkText: 'text-(--purple-dark)',
    baseText: 'text-(--purple-base)',
    lightBg: 'bg-(--purple-light)',
  },

  [CategoryColor.PINK]: {
    darkText: 'text-(--pink-dark)',
    baseText: 'text-(--pink-base)',
    lightBg: 'bg-(--pink-light)',
  },

  [CategoryColor.RED]: {
    darkText: 'text-(--red-dark)',
    baseText: 'text-(--red-base)',
    lightBg: 'bg-(--red-light)',
  },

  [CategoryColor.ORANGE]: {
    darkText: 'text-(--orange-dark)',
    baseText: 'text-(--orange-base)',
    lightBg: 'bg-(--orange-light)',
  },

  [CategoryColor.YELLOW]: {
    darkText: 'text-(--yellow-dark)',
    baseText: 'text-(--yellow-base)',
    lightBg: 'bg-(--yellow-light)',
  },
}

export const resolveColor = (color: CategoryColor): ResolveColorsOutput =>
  categoryColors[color]
