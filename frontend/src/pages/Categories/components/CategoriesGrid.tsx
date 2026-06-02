import { CategoryLabel } from '@/components/CategoryLabel'
import { DeleteAndEditButtonGroup } from '@/components/DeleteAndEditButtonGroup'
import { Card, CardContent } from '@/components/ui/card'
import { CategoryColor, CategoryIcon, type Category } from '@/types'
import { resolveColor } from '@/utils/resolveColor'
import { resolveIcon } from '@/utils/resolveIcon'
import { createElement } from 'react'

export const CategoriesGrid = () => {
  return (
    <div className="grid grid-cols-4 gap-4 w-full">
      {[...Array(9)].map((_, index) => (
        <CategoryCard
          key={index}
          name={`Alimento`}
          description={'Compras de supermercado e mantimentos'}
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
}: Partial<Category>) => {
  const colors = resolveColor((color as CategoryColor) ?? CategoryColor.GREEN)
  const amountItems = 3

  return (
    <Card className="p-6">
      <CardContent className="flex flex-col gap-5">
        <div className="flex items-start justify-between w-full">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-md bg-(${colors.light})`}
          >
            {createElement(resolveIcon(icon ?? CategoryIcon.BRIEFCASE), {
              className: `text-(${colors.base})`,
            })}
          </div>

          <DeleteAndEditButtonGroup onDelete={() => {}} onEdit={() => {}} />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-foreground font-semibold">{name}</p>
          <span className="text-sm text-muted-foreground">{description}</span>
        </div>

        <div className="flex items-center justify-between">
          <CategoryLabel name={name ?? 'Categoria'} />
          <span className="text-sm text-muted-foreground">
            {amountItems}
            {` ite${amountItems > 1 ? 'ns' : 'm'}`}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

{
  /* export interface Category {
  id: string
  name: string
  icon: CategoryIcon
  color: string
  description?: string
  createdAt: string
  updatedAt: string
} */
}
