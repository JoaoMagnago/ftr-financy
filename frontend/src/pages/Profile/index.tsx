import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { REQUIRED_FIELD_MESSAGE } from '@/constants/form'
import { useAuthStore } from '@/stores/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { LogOut, Mail, UserRound } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import z from 'zod'
import { useShallow } from 'zustand/react/shallow'

const updateProfileFormSchema = z.object({
  name: z.string().min(3, REQUIRED_FIELD_MESSAGE),
})

type UpdateProfileFormValues = z.infer<typeof updateProfileFormSchema>

export const Profile = () => {
  const navigate = useNavigate()

  const { logout, user, updatingProfile, updateProfile } = useAuthStore(
    useShallow((state) => ({
      logout: state.logout,
      user: state.user,
      updatingProfile: state.updatingProfile,
      updateProfile: state.updateProfile,
    })),
  )

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {
      name: user?.name ?? '',
    },
  })

  useEffect(() => {
    reset({
      name: user?.name,
    })
  }, [user, reset])

  const onSubmit = async ({ name }: UpdateProfileFormValues) => {
    try {
      await updateProfile({
        name,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-md rounded-xl">
        <CardHeader className="flex flex-col items-center gap-6 justify-center">
          <Avatar name={user?.name} size="lg" />
          <div className="flex flex-col items-center gap-0.5">
            <CardTitle className="text-xl font-bold color-foreground">
              {user?.name}
            </CardTitle>
            <CardDescription className="text-(--gray-500)">
              {user?.email}
            </CardDescription>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="flex flex-col items-center gap-6">
          <form
            className="space-y-6 w-full"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="name"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name" aria-invalid={!!error}>
                    Nome completo
                  </Label>

                  <InputGroup data-state={value ? 'filled' : 'empty'}>
                    <InputGroupInput
                      id="name"
                      type="text"
                      value={value}
                      autoComplete="off"
                      placeholder="Seu nome completo"
                      onChange={(e) => onChange(e.target.value)}
                    />
                    <InputGroupAddon>
                      <UserRound />
                    </InputGroupAddon>
                  </InputGroup>

                  {error && (
                    <span className="text-xs text-(--gray-500)">
                      {error.message}
                    </span>
                  )}
                </div>
              )}
            />

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">E-mail</Label>
                <InputGroup data-disabled={true}>
                  <InputGroupInput
                    id="email"
                    type="email"
                    value={user?.email}
                    placeholder="mail@exemplo.com"
                    disabled
                  />
                  <InputGroupAddon>
                    <Mail />
                  </InputGroupAddon>
                </InputGroup>
              </div>
              <span className="text-xs text-(--gray-500)">
                A senha deve ter no mínimo 8 caracteres
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                size="xl"
                className="w-full"
                disabled={updatingProfile}
              >
                Salvar alterações
              </Button>

              <Button
                variant="outline"
                size="xl"
                className="text-md w-full"
                onClick={handleLogout}
              >
                <LogOut className="text-(--danger)" />
                Sair da conta
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
