import { Header } from '@/components/Header'
import { Filters } from './components/Filters'
import { TransactionsTable } from './components/TransactionsTable'
import { TransactionModal } from '@/components/Modals/TransactionModal'
import { useEffect, useState } from 'react'
import { useCategoriesStore } from '@/stores/categories'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export const Transactions = () => {
  const { categories, listCategories } = useCategoriesStore(
    useShallow((state) => ({
      categories: state.categories,
      listCategories: state.listCategories,
    })),
  )

  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
  const [isNewTransactionTooltipOpen, setIsTransactionTooltipOpen] =
    useState(false)

  useEffect(() => {
    if (categories.length === 0) {
      listCategories()
    }
  }, [categories, listCategories])

  return (
    <div className="flex flex-col items-center gap-8">
      <Header
        title="Transações"
        description="Gerencie todas as suas transações financeiras"
        rightElement={
          <div>
            <Tooltip open={isNewTransactionTooltipOpen}>
              <TooltipTrigger asChild>
                <span className="inline-block w-fit">
                  <Button
                    disabled={categories.length === 0}
                    onMouseOver={() => {
                      if (categories.length === 0) {
                        setIsTransactionTooltipOpen(true)
                      }
                    }}
                    onMouseOut={() => {
                      setIsTransactionTooltipOpen(false)
                    }}
                    onClick={() => setIsTransactionModalOpen(true)}
                  >
                    <Plus />
                    <span>Nova transação</span>
                  </Button>
                </span>
              </TooltipTrigger>

              <TooltipContent side={'left'}>
                <p>Crie ao menos uma categoria antes de criar uma transação</p>
              </TooltipContent>
            </Tooltip>

            <TransactionModal
              isOpen={isTransactionModalOpen}
              onOpenChange={setIsTransactionModalOpen}
            />
          </div>
        }
      />

      <Filters />

      <TransactionsTable />
    </div>
  )
}
