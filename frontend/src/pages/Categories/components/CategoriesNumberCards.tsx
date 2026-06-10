import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useDashboardStore } from '@/stores/dashboard'
import { CategoryColor } from '@/types'
import { resolveColor } from '@/utils/resolveColor'
import { resolveIcon } from '@/utils/resolveIcon'
import { ArrowUpDown, DollarSign, Tag } from 'lucide-react'
import { createElement, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

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
  const { dashboardSummary, loadingDashboard, getDashboardSummary } =
    useDashboardStore(
      useShallow((state) => ({
        dashboardSummary: state.dashboardSummary,
        loadingDashboard: state.loadingDashboard,
        getDashboardSummary: state.getDashboardSummary,
      })),
    )

  const category = dashboardSummary?.mostUsedCategory?.category
  const colors = resolveColor(
    category?.color ? (category?.color as CategoryColor) : CategoryColor.GREEN,
  )

  useEffect(() => {
    if (!dashboardSummary) {
      getDashboardSummary()
    }
  }, [dashboardSummary, getDashboardSummary])

  return (
    <div className="grid grid-cols-3 gap-6 w-full">
      <CategoriesNumberCard
        description="Total de categorias"
        icon={<Tag width={24} height={24} className="text-(--gray-700)" />}
      >
        {loadingDashboard ? (
          <Skeleton className="h-8 w-8" />
        ) : (
          dashboardSummary?.categoryCount
        )}
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
        {loadingDashboard ? (
          <Skeleton className="h-8 w-8" />
        ) : (
          dashboardSummary?.transactionCount
        )}
      </CategoriesNumberCard>
      <CategoriesNumberCard
        description="Categoria mais utilizada"
        icon={
          category?.icon ? (
            createElement(resolveIcon(category?.icon), {
              className: colors.baseText,
              height: 24,
              width: 24,
            })
          ) : (
            <DollarSign
              width={24}
              height={24}
              className="text-(--green-base)"
            />
          )
        }
      >
        {loadingDashboard ? (
          <Skeleton className="h-8 w-40" />
        ) : (
          (dashboardSummary?.mostUsedCategory?.category.name ?? 'Nenhuma')
        )}
      </CategoriesNumberCard>
    </div>
  )
}
