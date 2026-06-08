import { useState } from 'react'

import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Controller,
  useForm,
  useWatch,
  type FieldErrors,
} from 'react-hook-form'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../../ui/button'
import { Plus } from 'lucide-react'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { TransactionType, type CreateTransactionInput } from '@/types'
import { TransactionTypeSelector } from './components/TransactionTypeSelector'
import { TransactionDatePicker } from './components/TransactionDatePicker'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { REQUIRED_FIELD_MESSAGE } from '@/constants/form'
import { useTransactionsStore } from '@/stores/transactions'
import { useShallow } from 'zustand/react/shallow'
import { useCategoriesStore } from '@/stores/categories'

const TransactionSchema = z.object({
  type: z.enum(TransactionType),
  description: z.string().trim().min(1, REQUIRED_FIELD_MESSAGE),
  date: z.string(),
  amount: z.number(),
  categoryId: z.string(),
})

type TransactionFormValue = z.infer<typeof TransactionSchema>

export const TransactionModal = ({ isEditing }: { isEditing: boolean }) => {
  const categories = useCategoriesStore((state) => state.categories)

  const { createTransaction } = useTransactionsStore(
    useShallow((state) => ({
      createTransaction: state.createTransaction,
    })),
  )
  const [isOpen, setIsOpen] = useState(false)

  const {
    control,
    formState: { isSubmitting },
    reset,
    setFocus,
    setValue,
    handleSubmit,
  } = useForm<TransactionFormValue>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      description: '',
      amount: 0,
      type: TransactionType.EXPENSE,
      date: new Date().toISOString(),
    },
  })

  const amount = useWatch({
    control: control,
    name: 'amount',
  })

  const formatCurrencyInput = (value: number) => {
    return (value / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const handleAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: number) => void,
  ) => {
    const digits = event.target.value.replace(/\D/g, '')

    onChange(Number(digits || 0))
  }

  const handleClose = () => {
    reset()
    setIsOpen(false)
  }

  const onSubmit = async (data: CreateTransactionInput) => {
    try {
      await createTransaction(data)

      handleClose()
    } catch (error) {
      console.error(error)
    }
  }

  const onError = (errors: FieldErrors<TransactionFormValue>) => {
    const firstErrorField = Object.keys(errors)[0]

    if (firstErrorField) {
      setFocus(firstErrorField as keyof TransactionFormValue)
    }

    console.error(errors)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          <span>Nova transação</span>
        </Button>
      </DialogTrigger>
      <DialogContent handleCloseButton={handleClose}>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar transação' : 'Nova transação'}
          </DialogTitle>
          <DialogDescription>Registre sua despesa ou receita</DialogDescription>
        </DialogHeader>

        <form
          id="Transaction-form"
          noValidate
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <Controller
            name="type"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TransactionTypeSelector type={value} selectType={onChange} />
            )}
          />

          <div className="flex flex-col gap-4">
            <Controller
              name="description"
              control={control}
              render={({ field: { value, onChange } }) => (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Input
                    id="description"
                    type="text"
                    value={value}
                    placeholder="Descrição da categoria"
                    autoComplete="off"
                    required
                    onChange={onChange}
                  />
                </div>
              )}
            />

            <div className="flex items-center gap-4">
              <Controller
                name="date"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="date">Data</Label>
                    <TransactionDatePicker
                      date={value ? new Date(value) : undefined}
                      setDate={(date) => onChange(date.toISOString())}
                    />
                  </div>
                )}
              />

              <div className="flex flex-col gap-2">
                <Label htmlFor="amount">Valor</Label>
                <InputGroup data-state={amount ? 'filled' : 'empty'}>
                  <InputGroupAddon>
                    <span>R$</span>
                  </InputGroupAddon>
                  <InputGroupInput
                    id="name"
                    type="text"
                    placeholder="0,00"
                    value={formatCurrencyInput(amount ?? 0)}
                    required
                    onChange={(e) =>
                      handleAmountChange(e, (value) =>
                        setValue('amount', value),
                      )
                    }
                  />
                </InputGroup>
              </div>
            </div>

            <Controller
              name="categoryId"
              control={control}
              render={({ field: { value, onChange } }) => (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="categoryId">Categoria</Label>

                  <Select value={value} onValueChange={onChange}>
                    <SelectTrigger className="h-12 w-full text-md">
                      {value ? (
                        <SelectValue />
                      ) : (
                        <span className="text-(--input-placeholder)">
                          Selecione
                        </span>
                      )}
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      className="w-auto border border-border mt-1"
                    >
                      <SelectGroup>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </div>
        </form>

        <Button
          form="Transaction-form"
          type="submit"
          size="xl"
          className="w-full"
          disabled={isSubmitting}
        >
          Salvar
        </Button>
      </DialogContent>
    </Dialog>
  )
}
