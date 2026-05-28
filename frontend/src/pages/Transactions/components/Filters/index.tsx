import { Card } from '@/components/ui/card'
import { SearchFilter } from '../SearchFilter'

export const Filters = () => {
  return (
    <Card className="flex flex-col items-center gap-4 w-full">
      <SearchFilter />
    </Card>
  )
}
