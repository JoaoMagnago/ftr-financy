import { CategoryLabel } from '@/components/CategoryLabel'
import { DeleteAndEditButtonGroup } from '@/components/DeleteAndEditButtonGroup'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useCategoriesStore } from '@/stores/categories'
import { CategoryColor, CategoryIcon, type CategoryListItem } from '@/types'
import { resolveColor } from '@/utils/resolveColor'
import { resolveIcon } from '@/utils/resolveIcon'
import { createElement, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

export const CategoriesGrid = () => {
  const { categories, loading, listCategories } = useCategoriesStore(
    useShallow((state) => ({
      categories: state.categories,
      loading: state.loading,
      listCategories: state.listCategories,
    })),
  )

  useEffect(() => {
    if (categories.length === 0) {
      listCategories()
    }
  }, [categories, listCategories])

  return (
    <div className="grid grid-cols-4 gap-4 w-full">
      {loading
        ? Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-50" />
          ))
        : categories.map((item) => (
            <CategoryCard
              key={item.id}
              name={item.name}
              description={item.description}
              icon={item.icon}
              color={item.color}
              transactionCount={item.transactionCount}
            />
          ))}
    </div>
  )
}

const CategoryCard = ({
  name,
  description,
  icon,
  color,
  transactionCount,
}: Partial<CategoryListItem>) => {
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

          <DeleteAndEditButtonGroup onDelete={() => {}} onEdit={() => {}} />
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
