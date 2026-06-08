import { CategoryLabel } from '@/components/CategoryLabel'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TransactionType, type Transaction } from '@/types'
import { CircleArrowDown, CircleArrowUp, DollarSign } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'
import { CustomPagination } from './CustomPagination'
import { useEffect, useState } from 'react'
import { useTransactionsStore } from '@/stores/transactions'
import { resolveIcon } from '@/utils/resolveIcon'
import { Skeleton } from '@/components/ui/skeleton'
import { TransactionModal } from '@/components/Modals/TransactionModal'
import { DeleteAndEditButtonGroup } from '@/components/DeleteAndEditButtonGroup'

export function TransactionsTable({ className }: { className?: string }) {
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null)

  const {
    transactions,
    loading,
    deleting,
    filters,
    totalCount,
    pages,
    setFilters,
    listTransactions,
    deleteTransaction,
  } = useTransactionsStore(
    useShallow((state) => ({
      transactions: state.transactions,
      loading: state.loading,
      deleting: state.deleting,
      filters: state.filters,
      totalCount: state.total,
      pages: state.pages,
      setFilters: state.setFilters,
      listTransactions: state.listTransactions,
      deleteTransaction: state.deleteTransaction,
    })),
  )

  useEffect(() => {
    listTransactions(filters)
  }, [filters, listTransactions])

  return (
    <Card className={`p-0 gap-0 w-full ${className}`}>
      <CardContent className="flex flex-col items-center justify-center p-0">
        {loading ? (
          <div className="flex flex-col gap-2 p-4 mt-10 w-full">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className="h-10" />
            ))}
          </div>
        ) : (
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
                const transactionIcon = transaction.category?.icon

                const IconComponent = transactionIcon
                  ? resolveIcon(transactionIcon)
                  : DollarSign

                const dateFormatted = transaction.createdAt
                  ? new Date(transaction.createdAt).toLocaleDateString(
                      'pt-BR',
                      {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                      },
                    )
                  : 'Sem data'

                const isExpense = transaction.type === TransactionType.EXPENSE

                const amountFormatted = new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(Number(transaction.amount) / 100)

                return (
                  <TableRow
                    key={transaction.id}
                    className="hover:bg-transparent"
                  >
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-(--green-light) text-(--green-base)">
                          {transactionIcon ? (
                            <IconComponent height={16} width={16} />
                          ) : null}
                        </div>

                        <span className="text-md font-medium text-foreground">
                          {transaction.description}
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
                        <CategoryLabel
                          name={transaction.category?.name ?? 'Sem categoria'}
                        />
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

                    <TableCell className="pr-6 text-right">
                      <DeleteAndEditButtonGroup
                        isDeleteDisabled={deleting}
                        onEdit={() => {
                          setEditingTransaction(transaction)
                        }}
                        onDelete={() => deleteTransaction(transaction.id)}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}

        <TransactionModal
          isOpen={!!editingTransaction}
          transaction={editingTransaction}
          onOpenChange={() => setEditingTransaction(null)}
        />
      </CardContent>
      <CardFooter className="flex items-center justify-end px-6 py-5">
        <div className="flex items-center gap-1 text-sm text-(--gray-700) w-full">
          <span className="font-medium">{filters.page}</span>
          <span>de</span>
          <span className="font-medium">{pages}</span>
          <span> | {totalCount} resultados</span>
        </div>

        <CustomPagination
          currentPage={filters.page}
          totalPages={pages}
          onPageChange={(page) =>
            setFilters({
              page,
            })
          }
        />
      </CardFooter>
    </Card>
  )
}
