import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { useDebounce } from '@/hooks/useDebounce'
import { useTransactionsStore } from '@/stores/transactions'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

export const SearchFilter = () => {
  const setFilters = useTransactionsStore((state) => state.setFilters)

  const [search, setSearch] = useState('')

  const debouncedSearch = useDebounce(search)

  useEffect(() => {
    setFilters({
      description: debouncedSearch,
      page: 1,
    })
  }, [debouncedSearch, setFilters])

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor="search-input">Buscar</Label>
      <InputGroup data-state={search.length > 0 ? 'filled' : 'empty'}>
        <InputGroupAddon>
          <Search />
          <InputGroupInput
            id="search-input"
            placeholder="Buscar por descrição"
            className="font-normal"
            autoComplete="off"
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
