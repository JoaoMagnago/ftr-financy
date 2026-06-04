import { Header } from '@/components/Header'
import { CategoriesNumberCards } from './components/CategoriesNumberCards'
import { CategoriesGrid } from './components/CategoriesGrid'
import { CategoryModal } from '@/components/Modals/CategoryModal'

export const Categories = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <Header
        title="Categorias"
        description="Organize suas transações por categorias"
        rightElement={<CategoryModal isEditing={false} />}
      />

      <CategoriesNumberCards />

      <CategoriesGrid />
    </div>
  )
}
