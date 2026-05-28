import { Header } from '@/components/Header'
import { Filters } from './components/Filters'
import { TransactionsTable } from './components/TransactionsTable'

export const Transactions = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <Header
        title="Transações"
        description="Gerencie todas as suas transações financeiras"
        buttonLabel="Nova transação"
      />

      <Filters />

      <TransactionsTable />
    </div>
  )
}
