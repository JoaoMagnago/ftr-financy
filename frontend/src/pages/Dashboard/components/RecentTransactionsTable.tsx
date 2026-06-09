import { CategoryLabel } from '@/components/CategoryLabel'
import { TransactionModal } from '@/components/Modals/TransactionModal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useCategoriesStore } from '@/stores/categories'
import { useDashboardStore } from '@/stores/dashboard'
import { CategoryColor, TransactionType } from '@/types'
import { resolveColor } from '@/utils/resolveColor'
import { resolveIcon } from '@/utils/resolveIcon'
import {
  ChevronRight,
  CircleArrowDown,
  CircleArrowUp,
  DollarSign,
  Plus,
} from 'lucide-react'
import { createElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function RecentTransactionsTable({ className }: { className?: string }) {
  const navigate = useNavigate()

  const latestTransactions =
    useDashboardStore((state) => state.dashboardSummary)?.latestTransactions ??
    []

  const categories = useCategoriesStore((state) => state.categories)

  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
  const [isNewTransactionTooltipOpen, setIsTransactionTooltipOpen] =
    useState(false)

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
            {latestTransactions.map((transaction) => {
              const transactionIcon = transaction.category?.icon
              const colors = resolveColor(
                transaction.category?.color
                  ? (transaction.category?.color as CategoryColor)
                  : CategoryColor.GREEN,
              )

              const dateFormatted = transaction.createdAt
                ? new Date(transaction.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                  })
                : 'Sem data'

              const isExpense = transaction.type === TransactionType.EXPENSE

              const amountFormatted = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(Number(transaction.amount) / 100)

              return (
                <TableRow key={transaction.id} className="hover:bg-transparent">
                  <TableCell className="pl-6 w-[60%]">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-md ${colors.lightBg}`}
                      >
                        {transactionIcon ? (
                          createElement(resolveIcon(transactionIcon), {
                            className: colors.baseText,
                            height: 16,
                            width: 16,
                          })
                        ) : (
                          <DollarSign />
                        )}
                      </div>

                      <div className="flex flex-col gap-0.5">
                        <span className="text-md font-medium text-foreground">
                          {transaction.description}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {dateFormatted}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="w-[20%]">
                    <div className="flex items-center justify-center">
                      <CategoryLabel
                        name={transaction.category?.name ?? 'Categoria'}
                        colors={colors}
                      />
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
          <Tooltip open={isNewTransactionTooltipOpen}>
            <TooltipTrigger asChild>
              <span className="inline-block w-fit">
                <Button
                  variant="link"
                  className="text-primary gap-1 hover:no-underline"
                  disabled={categories.length === 0}
                  onMouseOver={() => {
                    if (categories.length === 0) {
                      setIsTransactionTooltipOpen(true)
                    }
                  }}
                  onMouseOut={() => {
                    setIsTransactionTooltipOpen(false)
                  }}
                  onClick={() => setIsTransactionModalOpen(true)}
                >
                  <Plus />
                  <span>Nova transação</span>
                </Button>
              </span>
            </TooltipTrigger>

            <TooltipContent side={'bottom'}>
              <p>Crie ao menos uma categoria antes de criar uma transação</p>
            </TooltipContent>
          </Tooltip>

          <TransactionModal
            isOpen={isTransactionModalOpen}
            onOpenChange={setIsTransactionModalOpen}
          />
        </div>
      </CardContent>
    </Card>
  )
}
