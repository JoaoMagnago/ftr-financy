import { Header } from '@/components/Header'
import { Filters } from './components/Filters'

export const Transactions = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <Header
        title="Transações"
        description="Gerencie todas as suas transações financeiras"
        buttonLabel="Nova transação"
      />

      <Filters />
    </div>
  )
}
