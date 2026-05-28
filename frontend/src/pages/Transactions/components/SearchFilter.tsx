import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { useDebounce } from '@/hooks/useDebounce'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

export const SearchFilter = () => {
  const [search, setSearch] = useState('')

  const debouncedSearch = useDebounce(search)

  useEffect(() => {
    console.log(debouncedSearch)

    // query/refetch aqui
  }, [debouncedSearch])

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="search" className="">
        Buscar
      </Label>
      <InputGroup data-state={search.length > 0 ? 'filled' : 'empty'}>
        <InputGroupAddon>
          <Search />
          <InputGroupInput
            id="search"
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
