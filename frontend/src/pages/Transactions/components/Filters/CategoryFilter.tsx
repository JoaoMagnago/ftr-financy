import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCategoriesStore } from '@/stores/categories'
import { useTransactionsStore } from '@/stores/transactions'

export const CategoryFilter = () => {
  const categories = useCategoriesStore((state) => state.categories)

  const setFilters = useTransactionsStore((state) => state.setFilters)

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor="category-select">Categoria</Label>

      <Select
        defaultValue="all"
        onValueChange={(value) => {
          setFilters({
            page: 1,
            categoryId: value === 'all' ? undefined : value,
          })
        }}
      >
        <SelectTrigger id="category-select" className="h-12 w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          position="popper"
          className="w-auto border border-border mt-1"
        >
          <SelectGroup>
            <SelectItem value="all">Todos</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
