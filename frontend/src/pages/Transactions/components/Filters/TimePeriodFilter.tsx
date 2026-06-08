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
import { getLast12Months } from '@/utils/date'

/* NOTA DO DESENVOLVEDOR

  Normalmente eu usaria um date-picker, que até existe no shadcn/radix-ui. Cheguei a implementar com essa abordagem,
  mas observando o protótipo com mais cuidado, percebi que o campo do filtro de intervalo de data não incluia dias ou
  mesmo uma prévia de como deveria ser o componente quando aberto. Decidi usar uma estratégia mais simples no backend
  e no frontend: listar os últimos 12 meses dinamicamente. Para uma aplicação de estudo não vejo como um problema,
  além de que nas instruções do projeto nada era informado sobre filtros ou paginação de transações.
*/

export const TimePeriodFilter = () => {
  const setFilters = useTransactionsStore((state) => state.setFilters)

  const monthOptions = getLast12Months()

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor="time-period-select">Data</Label>

      <Select
        defaultValue="all"
        onValueChange={(value) => {
          if (value === 'all') {
            setFilters({
              page: 1,
              month: undefined,
              year: undefined,
            })

            return
          }

          const selectedOption = monthOptions.find(
            (option) => option.value === value,
          )

          if (!selectedOption) return

          setFilters({
            page: 1,
            month: selectedOption.month,
            year: selectedOption.year,
          })
        }}
      >
        <SelectTrigger className="h-12 w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          position="popper"
          className="w-auto border border-border mt-1"
        >
          <SelectGroup>
            {monthOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
