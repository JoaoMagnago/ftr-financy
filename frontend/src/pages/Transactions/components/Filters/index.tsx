import { Card } from '@/components/ui/card'
import { SearchFilter } from './SearchFilter'
import { TypeFilter } from './TypeFilter'

export const Filters = () => {
  return (
    <Card className="flex flex-row items-center gap-4 w-full">
      <SearchFilter />

      <TypeFilter />
    </Card>
  )
}
