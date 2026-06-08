import { Card } from '@/components/ui/card'
import { SearchFilter } from './SearchFilter'
import { TypeFilter } from './TypeFilter'
import { CategoryFilter } from './CategoryFilter'
import { TimePeriodFilter } from './TimePeriodFilter'

export const Filters = () => {
  return (
    <Card className="flex flex-row items-center gap-4 px-6 py-5 w-full">
      <SearchFilter />

      <TypeFilter />

      <CategoryFilter />

      <TimePeriodFilter />
    </Card>
  )
}
