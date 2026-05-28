import { CategoryLabel } from '@/components/CategoryLabel'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TransactionType } from '@/types'
import { BriefcaseBusiness, CircleArrowDown, CircleArrowUp } from 'lucide-react'

export function TransactionsTable({ className }: { className?: string }) {
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
      <CardContent className="flex flex-col items-center justify-center p-0">
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow className="py-5 hover:bg-transparent">
              <TableHead className="w-[40%] pl-6 py-5">Descrição</TableHead>
              <TableHead className="text-center w-[14%] py-5">Data</TableHead>
              <TableHead className="text-center w-[16%] py-5">
                Categoria
              </TableHead>
              <TableHead className="text-center w-[10%] py-5">Tipo</TableHead>
              <TableHead className="w-[10%] py-5 text-right">Valor</TableHead>
              <TableHead className="w-[10%] pr-6 py-5 text-right">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
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
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-(--green-light) text-(--green-base)">
                        {transaction.category.icon}
                      </div>

                      <span className="text-md font-medium text-foreground">
                        {transaction.name}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    <span className="text-sm text-muted-foreground">
                      {dateFormatted}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center">
                      <CategoryLabel name={transaction.category.name} />
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center font-medium gap-2">
                      {isExpense ? (
                        <CircleArrowDown className="text-(--red-base) w-4 h-4" />
                      ) : (
                        <CircleArrowUp className="text-(--brand-base) w-4 h-4" />
                      )}
                      <span
                        className={`${isExpense ? 'text-(--red-base)' : 'text-(--brand-base)'}`}
                      >
                        {isExpense ? 'Saída' : 'Entrada'}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {isExpense ? '- ' : '+ '}
                        {amountFormatted}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="pr-6 text-right"></TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
