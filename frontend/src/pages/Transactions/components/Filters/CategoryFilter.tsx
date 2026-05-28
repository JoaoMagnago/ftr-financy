import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface CategoryFilterProps {
  categories: {
    id: string
    name: string
  }[]
}

export const CategoryFilter = ({ categories }: CategoryFilterProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor="type-select">Categoria</Label>

      <Select defaultValue="all">
        <SelectTrigger className="h-12 w-full">
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
