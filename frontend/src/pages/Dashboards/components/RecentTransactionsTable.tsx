import { CategoryLabel } from '@/components/CategoryLabel'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { TransactionType } from '@/types'
import {
  BriefcaseBusiness,
  ChevronRight,
  CircleArrowDown,
  CircleArrowUp,
  Plus,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function RecentTransactionsTable({ className }: { className?: string }) {
  const navigate = useNavigate()

  const transactions = [
    {
      id: '1',
      name: 'Pagamento de salário',
      type: TransactionType.REVENUE,
      amount: '425000',
      createdAt: '2025-01-15T08:30:00.000Z',
      category: {
        id: '1',
        name: 'Receita',
        color: 'red',
        icon: <BriefcaseBusiness className="w-4" />,
      },
    },
    {
      id: '2',
      name: 'Jantar no restaurante',
      type: TransactionType.EXPENSE,
      amount: '8950',
      createdAt: '2025-03-22T14:45:10.250Z',
      category: {
        id: '1',
        name: 'Alimentação',
        color: 'red',
        icon: <BriefcaseBusiness className="w-4" />,
      },
    },
    {
      id: '3',
      name: 'Posto de gasolina',
      type: TransactionType.EXPENSE,
      amount: '10000',
      createdAt: '2025-06-01T00:00:00.000Z',
      category: {
        id: '1',
        name: 'Transporte',
        color: 'red',
        icon: <BriefcaseBusiness className="w-4" />,
      },
    },
    {
      id: '4',
      name: 'Compras no mercado',
      type: TransactionType.EXPENSE,
      amount: '15680',
      createdAt: '2025-09-10T19:05:42.999Z',
      category: {
        id: '1',
        name: 'Mercado',
        color: 'red',
        icon: <BriefcaseBusiness className="w-4" />,
      },
    },
    {
      id: '5',
      name: 'Retorno de investimento',
      type: TransactionType.REVENUE,
      amount: '34025',
      createdAt: '2025-12-31T23:59:59.999Z',
      category: {
        id: '1',
        name: 'Investimento',
        color: 'red',
        icon: <BriefcaseBusiness className="w-4" />,
      },
    },
  ]

  return (
    <Card className={`p-0 gap-0 ${className}`}>
      <CardHeader className="grid-cols-[1fr_auto] items-center pl-6 pr-3 py-5 border-b border-(--border)">
        <p className="text-xs text-(--gray-500) font-medium tracking-[0.6px] uppercase">
          Transações recentes
        </p>
        <Button
          className="bg-transparent border-none text-sm font-medium text-primary enabled:hover:bg-transparent"
          onClick={() => navigate('/transactions')}
        >
          <span>Ver todas</span>
          <ChevronRight />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-0">
        <Table className="table-fixed w-full">
          <TableBody className="border-b border-border">
            {transactions.map((transaction) => {
              const dateFormatted = new Date(
                transaction.createdAt,
              ).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
              })

              const isExpense = transaction.type === TransactionType.EXPENSE

              const amountFormatted = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(Number(transaction.amount) / 100)

              return (
                <TableRow key={transaction.id} className="hover:bg-transparent">
                  <TableCell className="pl-6 w-[60%]">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-(--green-light) text-(--green-base)">
                        {transaction.category.icon}
                      </div>

                      <div className="flex flex-col gap-0.5">
                        <span className="text-md font-medium text-foreground">
                          {transaction.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {dateFormatted}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="w-[20%]">
                    <div className="flex items-center justify-center">
                      <CategoryLabel name={transaction.category.name} />
                    </div>
                  </TableCell>

                  <TableCell className="pr-6 text-right w-[20%]">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {isExpense ? '- ' : '+ '}
                        {amountFormatted}
                      </span>
                      {isExpense ? (
                        <CircleArrowDown className="text-(--red-base) w-4 h-4" />
                      ) : (
                        <CircleArrowUp className="text-(--brand-base) w-4 h-4" />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <div className="flex justify-center py-5 w-full">
          <Button
            variant="link"
            className="text-primary gap-1 hover:no-underline"
          >
            <Plus />
            <span>Nova transação</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
