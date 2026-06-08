import { Card, CardContent, CardTitle } from '@/components/ui/card'

interface DashboardNumberCardProps {
  title: string
  valueInCents: number
  icon: React.ReactNode
}

export const DashboardNumberCard = ({
  title,
  valueInCents,
  icon,
}: DashboardNumberCardProps) => {
  const formattedValue = (valueInCents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <Card className="gap-4">
      <CardTitle className="flex items-center gap-3 text-xs text-(--gray-500) tracking-[0.6px] uppercase">
        {icon}
        {title}
      </CardTitle>
      <CardContent>
        <p className="text-3xl font-bold text-card-foreground">
          {formattedValue}
        </p>
      </CardContent>
    </Card>
  )
}
