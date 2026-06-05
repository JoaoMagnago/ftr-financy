import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import z from 'zod'
import { REQUIRED_FIELD_MESSAGE } from '@/constants/form'
import { CategoryColor, CategoryIcon } from '@/types'
import { Controller, useForm, type FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { resolveIcon } from '@/utils/resolveIcon'
import { resolveColor } from '@/utils/resolveColor'
import { useState } from 'react'

const categorySchema = z.object({
  name: z.string().min(1, REQUIRED_FIELD_MESSAGE),
  description: z.string().optional(),
  icon: z.enum(CategoryIcon),
  color: z.enum(CategoryColor),
})

type CategoryFormValue = z.infer<typeof categorySchema>

export const CategoryModal = ({ isEditing }: { isEditing: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)

  const {
    control,
    formState: { isSubmitting },
    reset,
    setFocus,
    handleSubmit,
  } = useForm<CategoryFormValue>({
    resolver: zodResolver(categorySchema),
  })

  const handleClose = () => {
    reset()
    setIsOpen(false)
  }

  const onSubmit = (data: CategoryFormValue) => {
    console.log(data)
    handleClose()
  }

  const onError = (errors: FieldErrors<CategoryFormValue>) => {
    const firstErrorField = Object.keys(errors)[0]

    if (firstErrorField) {
      setFocus(firstErrorField as keyof CategoryFormValue)
    }

    console.error(errors)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          <span>Nova categoria</span>
        </Button>
      </DialogTrigger>
      <DialogContent handleCloseButton={handleClose}>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar categoria' : 'Nova categoria'}
          </DialogTitle>
          <DialogDescription>
            Organize suas transações com categorias
          </DialogDescription>
        </DialogHeader>

        <form
          id="category-form"
          noValidate
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Título</Label>
                <Input
                  id="name"
                  type="text"
                  value={value}
                  placeholder="Ex. Alimentação"
                  autoComplete="off"
                  required
                  onChange={onChange}
                />
              </div>
            )}
          />

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
                  onChange={onChange}
                />
                <span className="text-xs text-(--gray-500)">Opcional</span>
              </div>
            )}
          />

          <Controller
            name="icon"
            control={control}
            render={({ field: { value, onChange } }) => {
              const categoryIcons = Object.values(CategoryIcon)

              return (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="icons">Ícone</Label>

                  <div className="grid grid-cols-8 gap-2">
                    {categoryIcons.map((icon) => {
                      const IconComponent = resolveIcon(icon)

                      return (
                        <div
                          key={icon}
                          className={`flex items-center justify-center h-10.5 w-10.5 border cursor-pointer rounded-md ${
                            value === icon
                              ? 'border-primary bg-secondary'
                              : 'border-(--gray-300)'
                          }`}
                          onClick={() => onChange(icon)}
                        >
                          <IconComponent className="text-muted-foreground h-5 w-5" />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            }}
          />

          <Controller
            name="color"
            control={control}
            render={({ field: { value, onChange } }) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor="colors">Cor</Label>
                <div className="grid grid-cols-7 gap-2">
                  {Object.values(CategoryColor).map((color) => {
                    const colors = resolveColor(color)

                    return (
                      <div
                        key={color}
                        className={`flex p-1 border cursor-pointer rounded-md ${value === color ? 'border-primary' : 'border-(--gray-300)'}`}
                        onClick={() => onChange(color)}
                      >
                        <div
                          className="h-5 w-full rounded-sm"
                          style={{
                            backgroundColor: `var(${colors.base})`,
                          }}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          />
        </form>

        <Button
          form="category-form"
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
