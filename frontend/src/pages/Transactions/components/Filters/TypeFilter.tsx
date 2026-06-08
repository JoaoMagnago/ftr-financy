import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTransactionsStore } from '@/stores/transactions'
import { TransactionType } from '@/types'

enum TypeOptions {
  ALL = 'all',
  EXPENSE = 'expense',
  REVENUE = 'revenue',
}

export const TypeFilter = () => {
  const setFilters = useTransactionsStore((state) => state.setFilters)

  const typeMap: Record<string, TransactionType | undefined> = {
    [TypeOptions.ALL]: undefined,
    [TypeOptions.EXPENSE]: TransactionType.EXPENSE,
    [TypeOptions.REVENUE]: TransactionType.REVENUE,
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor="type-select">Tipo</Label>

      <Select
        defaultValue={TypeOptions.ALL}
        onValueChange={(value) => {
          setFilters({
            page: 1,
            type: typeMap[value],
          })
        }}
      >
        <SelectTrigger className="h-12 w-full">
          <SelectValue id="type-select" />
        </SelectTrigger>
        <SelectContent
          position="popper"
          className="w-auto border border-border mt-1"
        >
          <SelectGroup>
            <SelectItem value={TypeOptions.ALL}>Todos</SelectItem>
            <SelectItem value={TypeOptions.EXPENSE}>Despesa</SelectItem>
            <SelectItem value={TypeOptions.REVENUE}>Receita</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
