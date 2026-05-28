import { CategoryLabel } from '@/components/CategoryLabel'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { CategoryIcon } from '@/types'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const CategoriesSummaryList = ({
  className,
}: {
  className?: string
}) => {
  const navigate = useNavigate()

  const categories = [
    {
      id: '1',
      name: 'Alimentação',
      color: 'red',
      amountItems: 12,
      totalAmount: 54230,
      icon: CategoryIcon.FOOD,
      createdAt: '2025-01-15T08:30:00.000Z',
      updatedAt: '2025-01-15T08:30:00.000Z',
    },
    {
      id: '2',
      name: 'Alimentação',
      color: 'red',
      amountItems: 12,
      totalAmount: 54230,
      icon: CategoryIcon.FOOD,
      createdAt: '2025-01-15T08:30:00.000Z',
      updatedAt: '2025-01-15T08:30:00.000Z',
    },
    {
      id: '3',
      name: 'Alimentação',
      color: 'red',
      amountItems: 12,
      totalAmount: 54230,
      icon: CategoryIcon.FOOD,
      createdAt: '2025-01-15T08:30:00.000Z',
      updatedAt: '2025-01-15T08:30:00.000Z',
    },
    {
      id: '4',
      name: 'Alimentação',
      color: 'red',
      amountItems: 12,
      totalAmount: 54230,
      icon: CategoryIcon.FOOD,
      createdAt: '2025-01-15T08:30:00.000Z',
      updatedAt: '2025-01-15T08:30:00.000Z',
    },
    {
      id: '5',
      name: 'Alimentação',
      color: 'red',
      amountItems: 12,
      totalAmount: 54230,
      icon: CategoryIcon.FOOD,
      createdAt: '2025-01-15T08:30:00.000Z',
      updatedAt: '2025-01-15T08:30:00.000Z',
    },
  ]

  return (
    <Card className={`p-0 h-fit ${className}`}>
      <CardHeader className="grid-cols-[1fr_auto] items-center pl-6 pr-3 py-5 border-b border-(--border)">
        <p className="text-xs text-(--gray-500) font-medium tracking-[0.6px] uppercase">
          Categorias
        </p>
        <Button
          className="bg-transparent border-none text-sm font-medium text-primary hover:bg-transparent"
          onClick={() => navigate('/categories')}
        >
          <span>Gerenciar</span>
          <ChevronRight />
        </Button>
      </CardHeader>

      <CardContent className="flex flex-col gap-5 px-8 pb-8 pt-0">
        {categories.map((category) => {
          const amountFormatted = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Number(category.totalAmount) / 100)

          return (
            <div
              key={category.id}
              className="grid grid-cols-[1fr_auto] items-center"
            >
              <div className="flex items-center justify-between">
                <CategoryLabel name={category.name} />
                <span className="text-sm text-muted-foreground">
                  {category.amountItems} itens
                </span>
              </div>

              <div className="w-22 text-right">
                <span className="text-sm text-foreground font-semibold">
                  {amountFormatted}
                </span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
