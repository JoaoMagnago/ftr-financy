import { Card } from '@/components/ui/card'
import { SearchFilter } from './SearchFilter'
import { TypeFilter } from './TypeFilter'
import { CategoryFilter } from './CategoryFilter'
import { TimePeriodFilter } from './TimePeriodFilter'

export const Filters = () => {
  const categories = [
    { id: '1', name: 'Alimentação' },
    { id: '2', name: 'Transporte' },
    { id: '3', name: 'Comida' },
    { id: '4', name: 'Aluguel' },
    { id: '5', name: 'Contas de casa' },
    { id: '6', name: 'Carro' },
    { id: '7', name: 'Investimentos' },
  ]

  return (
    <Card className="flex flex-row items-center gap-4 w-full">
      <SearchFilter />

      <TypeFilter />

      <CategoryFilter categories={categories} />

      <TimePeriodFilter />
    </Card>
  )
}
