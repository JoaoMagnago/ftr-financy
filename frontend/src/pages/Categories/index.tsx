import { Header } from '@/components/Header'
import { CategoriesNumberCards } from './components/CategoriesNumberCards'
import { CategoriesGrid } from './components/CategoriesGrid'

export const Categories = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <Header
        title="Categorias"
        description="Organize suas transações por categorias"
        buttonLabel="Nova categoria"
      />

      <CategoriesNumberCards />

      <CategoriesGrid />
    </div>
  )
}
