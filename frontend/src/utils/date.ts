import type { MonthOption } from '@/types'

export const getLast12Months = (): MonthOption[] => {
  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date()

    date.setMonth(date.getMonth() - index)

    const monthName = date.toLocaleDateString('pt-BR', {
      month: 'long',
    })

    return {
      value: `${date.getMonth() + 1}-${date.getFullYear()}`,
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      label:
        monthName.charAt(0).toUpperCase() +
        monthName.slice(1) +
        ` / ${date.getFullYear()}`,
    }
  }).reverse()

  return [
    {
      value: 'all',
      label: 'Todo o período',
    },
    ...months,
  ]
}
