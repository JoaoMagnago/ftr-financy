import { CircleArrowDown, CircleArrowUp, Wallet } from 'lucide-react'
import { DashboardNumberCard } from './components/DashboardNumberCard'
import { RecentTransactionsTable } from './components/RecentTransactionsTable'
import { CategoriesStatisticsList } from './components/CategoriesStatisticsList'
import { useDashboardStore } from '@/stores/dashboard'
import { useShallow } from 'zustand/react/shallow'
import { useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { useTransactionsStore } from '@/stores/transactions'

export const Dashboard = () => {
  const {
    dashboardSummary,
    loadingDashboard,
    loadingStatistics,
    getDashboardSummary,
    getCategoriesStatistics,
  } = useDashboardStore(
    useShallow((state) => ({
      dashboardSummary: state.dashboardSummary,
      loadingDashboard: state.loadingDashboard,
      loadingStatistics: state.loadingStatistics,
      getDashboardSummary: state.getDashboardSummary,
      getCategoriesStatistics: state.getCategoriesStatistics,
    })),
  )

  const transactions = useTransactionsStore((state) => state.transactions)

  useEffect(() => {
    getDashboardSummary()
    getCategoriesStatistics()
  }, [transactions, getDashboardSummary, getCategoriesStatistics])

  return (
    <div className="grid grid-cols-3 gap-6">
      {loadingDashboard || loadingStatistics ? (
        <>
          <Skeleton className="h-35" />
          <Skeleton className="h-35" />
          <Skeleton className="h-35" />
          <Skeleton className="col-span-2 h-75" />
          <Skeleton className="h-75" />
        </>
      ) : (
        <>
          <DashboardNumberCard
            title="Saldo total"
            valueInCents={dashboardSummary?.balance ?? 0}
            icon={<Wallet className="text-(--purple-base)" />}
          />
          <DashboardNumberCard
            title="Receitas do mês"
            valueInCents={dashboardSummary?.currentMonthRevenue ?? 0}
            icon={<CircleArrowUp className="text-(--primary)" />}
          />
          <DashboardNumberCard
            title="Despesas do mês"
            valueInCents={dashboardSummary?.currentMonthExpense ?? 0}
            icon={<CircleArrowDown className="text-(--red-base)" />}
          />

          <RecentTransactionsTable className="col-span-2" />

          <CategoriesStatisticsList />
        </>
      )}
    </div>
  )
}
