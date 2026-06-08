import { Header } from '@/components/Header'
import { Filters } from './components/Filters'
import { TransactionsTable } from './components/TransactionsTable'
import { TransactionModal } from '@/components/Modals/TransactionModal'
import { useEffect } from 'react'
import { useCategoriesStore } from '@/stores/categories'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const Transactions = () => {
  const listCategories = useCategoriesStore((state) => state.listCategories)

  useEffect(() => {
    listCategories()
  }, [listCategories])

  return (
    <div className="flex flex-col items-center gap-8">
      <Header
        title="Transações"
        description="Gerencie todas as suas transações financeiras"
        rightElement={
          <TransactionModal>
            <Button>
              <Plus />
              <span>Nova transação</span>
            </Button>
          </TransactionModal>
        }
      />

      <Filters />

      <TransactionsTable />
    </div>
  )
}
