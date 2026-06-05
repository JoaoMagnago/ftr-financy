import { Header } from '@/components/Header'
import { Filters } from './components/Filters'
import { TransactionsTable } from './components/TransactionsTable'
import { TransactionModal } from '@/components/Modals/TransactionModal'

export const Transactions = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <Header
        title="Transações"
        description="Gerencie todas as suas transações financeiras"
        rightElement={<TransactionModal isEditing={false} />}
      />

      <Filters />

      <TransactionsTable />
    </div>
  )
}
