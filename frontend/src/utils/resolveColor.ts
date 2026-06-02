import { CategoryColor } from '@/types'

type ResolveColorsOutput = {
  dark: string
  base: string
  light: string
}

const categoryColors: Record<CategoryColor, ResolveColorsOutput> = {
  [CategoryColor.GREEN]: {
    dark: '--green-dark',
    base: '--green-base',
    light: '--green-light',
  },

  [CategoryColor.BLUE]: {
    dark: '--blue-dark',
    base: '--blue-base',
    light: '--blue-light',
  },

  [CategoryColor.PURPLE]: {
    dark: '--purple-dark',
    base: '--purple-base',
    light: '--purple-light',
  },

  [CategoryColor.PINK]: {
    dark: '--pink-dark',
    base: '--pink-base',
    light: '--pink-light',
  },

  [CategoryColor.RED]: {
    dark: '--red-dark',
    base: '--red-base',
    light: '--red-light',
  },

  [CategoryColor.ORANGE]: {
    dark: '--orange-dark',
    base: '--orange-base',
    light: '--orange-light',
  },

  [CategoryColor.YELLOW]: {
    dark: '--yellow-dark',
    base: '--yellow-base',
    light: '--yellow-light',
  },
}

export const resolveColor = (color: CategoryColor): ResolveColorsOutput =>
  categoryColors[color]
