import { CategoryLabel } from '@/components/CategoryLabel'
import { DeleteAndEditButtonGroup } from '@/components/DeleteAndEditButtonGroup'
import { CategoryModal } from '@/components/Modals/CategoryModal'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useCategoriesStore } from '@/stores/categories'
import { useDashboardStore } from '@/stores/dashboard'
import {
  CategoryColor,
  CategoryIcon,
  type Category,
  type CategoryListItem,
} from '@/types'
import { resolveColor } from '@/utils/resolveColor'
import { resolveIcon } from '@/utils/resolveIcon'
import { createElement, useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

export const CategoriesGrid = () => {
  const { categories, loading, deleteCategory, listCategories } =
    useCategoriesStore(
      useShallow((state) => ({
        categories: state.categories,
        loading: state.loading,
        deleteCategory: state.deleteCategory,
        listCategories: state.listCategories,
      })),
    )

  const getDashboardSummary = useDashboardStore(
    (state) => state.getDashboardSummary,
  )

  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const handleDeleteCategory = async (id: string) => {
    await deleteCategory(id)
    await getDashboardSummary()
  }

  useEffect(() => {
    if (categories.length === 0) {
      listCategories()
    }
  }, [categories, listCategories])

  return (
    <div className="grid grid-cols-4 gap-4 w-full">
      {loading ? (
        Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-50" />
        ))
      ) : categories.length === 0 ? (
        <div className="flex flex-col gap-3 items-center justify-center h-100 col-span-4">
          <h2 className="font-medium">Nenhuma categoria cadastrada</h2>
          <p className="text-sm text-(--gray-500)">
            Crie categorias para visualizá-las nessa página
          </p>
        </div>
      ) : (
        categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            setEditingCategory={() => setEditingCategory(category)}
            handleDeleteCategory={() => handleDeleteCategory(category.id)}
          />
        ))
      )}

      <CategoryModal
        isOpen={!!editingCategory}
        category={editingCategory}
        onOpenChange={() => setEditingCategory(null)}
      />
    </div>
  )
}

type CategoryCardProps = {
  category: Partial<CategoryListItem>
  setEditingCategory: () => void
  handleDeleteCategory: () => void
}

const CategoryCard = ({
  category,
  setEditingCategory,
  handleDeleteCategory,
}: CategoryCardProps) => {
  const { name, description, icon, color, transactionCount } = category

  const colors = resolveColor(
    color ? (color as CategoryColor) : CategoryColor.GREEN,
  )

  const hasItems = transactionCount && transactionCount > 0

  return (
    <Card className="p-6">
      <CardContent className="flex flex-col h-full gap-5">
        <div className="flex items-start justify-between w-full">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-md ${colors.lightBg}`}
          >
            {createElement(resolveIcon(icon ?? CategoryIcon.BRIEFCASE), {
              className: `h-4 w-4 ${colors.baseText}`,
            })}
          </div>

          <DeleteAndEditButtonGroup
            onEdit={setEditingCategory}
            onDelete={handleDeleteCategory}
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-foreground font-semibold">{name}</p>
          {<span className="text-sm text-muted-foreground">{description}</span>}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <CategoryLabel name={name ?? 'Categoria'} colors={colors} />
          <span className="text-sm text-muted-foreground">
            {hasItems ? transactionCount : ''}
            {hasItems
              ? ` ite${transactionCount && transactionCount > 1 ? 'ns' : 'm'}`
              : 'Vazio'}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
