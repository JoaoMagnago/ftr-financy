import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const TypeFilter = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor="type-select">Tipo</Label>

      <Select defaultValue="all">
        <SelectTrigger className="h-12 w-full">
          <SelectValue id="type-select" />
        </SelectTrigger>
        <SelectContent
          position="popper"
          className="w-auto border border-border mt-1"
        >
          <SelectGroup>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="expense">Despesa</SelectItem>
            <SelectItem value="revenue">Receita</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
