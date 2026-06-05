import { Button } from '@/components/ui/button'
import { TransactionType } from '@/types'
import { CircleArrowDown, CircleArrowUp } from 'lucide-react'

export const TransactionTypeSelector = ({
  type,
  selectType,
}: {
  type: TransactionType
  selectType: (type: TransactionType) => void
}) => {
  const isExpense = type === TransactionType.EXPENSE

  return (
    <div className="grid grid-cols-2 gap-2 items-center p-2 rounded-lg border border-(--border)">
      <Button
        type="button"
        variant="ghost"
        className={`py-3.5 gap-3 ${isExpense ? 'bg-secondary border-(--red-base)' : ''}`}
        onClick={() => selectType(TransactionType.EXPENSE)}
      >
        <CircleArrowDown
          className={isExpense ? 'text-(--red-base)' : 'text-(--gray-400)'}
        />
        <span
          className={`text-md ${isExpense ? 'text-foreground font-medium' : 'text-muted-foreground font-normal'}`}
        >
          Despesa
        </span>
      </Button>

      <Button
        type="button"
        variant="ghost"
        className={`py-3.5 gap-3 ${!isExpense ? 'bg-secondary border-primary' : ''}`}
        onClick={() => selectType(TransactionType.REVENUE)}
      >
        <CircleArrowUp
          className={!isExpense ? 'text-primary' : 'text-(--gray-400)'}
        />
        <span
          className={`text-md ${!isExpense ? 'text-foreground font-medium' : 'text-muted-foreground font-normal'}`}
        >
          Receita
        </span>
      </Button>
    </div>
  )
}
