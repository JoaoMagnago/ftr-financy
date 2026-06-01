import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { ArrowUpDown, Tag, Utensils } from 'lucide-react'

interface CategoriesNumberCardProps {
  description: string
  icon: React.ReactNode
  children: React.ReactNode
}

export const CategoriesNumberCard = ({
  description,
  icon,
  children,
}: CategoriesNumberCardProps) => {
  return (
    <Card className="gap-4">
      <CardTitle className="flex items-center gap-4">
        {icon}
        <h2 className="text-3xl font-bold text-card-foreground">{children}</h2>
      </CardTitle>
      <CardContent>
        <p className="text-xs text-(--gray-500) tracking-[0.6px] uppercase">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

export const CategoriesNumberCards = () => {
  return (
    <div className="grid grid-cols-3 gap-6 w-full">
      <CategoriesNumberCard
        description="Total de categorias"
        icon={<Tag width={24} height={24} className="text-(--gray-700)" />}
      >
        {8}
      </CategoriesNumberCard>
      <CategoriesNumberCard
        description="Total de transações"
        icon={
          <ArrowUpDown
            width={24}
            height={24}
            className="text-(--purple-base)"
          />
        }
      >
        {27}
      </CategoriesNumberCard>
      <CategoriesNumberCard
        description="Categoria mais utilizada"
        icon={
          <Utensils width={24} height={24} className="text-(--blue-base)" />
        }
      >
        {'Alimentação'}
      </CategoriesNumberCard>
    </div>
  )
}
