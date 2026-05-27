import { CircleArrowDown, CircleArrowUp, Wallet } from 'lucide-react'
import { DashboardNumberCard } from './components/DashboardNumberCard'

export const Dashboards = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <DashboardNumberCard
        title="Saldo total"
        valueInCents={1284732}
        icon={<Wallet className="text-(--purple-base)" />}
      />
      <DashboardNumberCard
        title="Receitas do mês"
        valueInCents={425000}
        icon={<CircleArrowUp className="text-(--primary)" />}
      />
      <DashboardNumberCard
        title="Despesas do mês"
        valueInCents={218045}
        icon={<CircleArrowDown className="text-(--red-base)" />}
      />
    </div>
  )
}
