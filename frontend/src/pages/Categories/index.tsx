import { Header } from '@/components/Header'
import { CategoriesNumberCards } from './components/CategoriesNumberCards'

export const Categories = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <Header
        title="Transações"
        description="Gerencie todas as suas transações financeiras"
        buttonLabel="Nova transação"
      />

      <CategoriesNumberCards />
    </div>
  )
}
