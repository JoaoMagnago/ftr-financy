import { Header } from '@/components/Header'
import { CategoriesNumberCards } from './components/CategoriesNumberCards'
import { CategoriesGrid } from './components/CategoriesGrid'
import { CategoryModal } from '@/components/Modals/CategoryModal'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export const Categories = () => {
  const [isOpen, onOpenChange] = useState(false)

  return (
    <div className="flex flex-col items-center gap-8">
      <Header
        title="Categorias"
        description="Organize suas transações por categorias"
        rightElement={
          <div>
            <Button onClick={() => onOpenChange(true)}>
              <Plus />
              <span>Nova categoria</span>
            </Button>

            <CategoryModal isOpen={isOpen} onOpenChange={onOpenChange} />
          </div>
        }
      />

      <CategoriesNumberCards />

      <CategoriesGrid />
    </div>
  )
}
