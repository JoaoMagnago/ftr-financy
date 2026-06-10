import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Eye, EyeClosed, Lock, LogIn, Mail, UserRound } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useAuthStore } from '@/stores/auth'

import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import logo from '@/assets/logo.svg'
import { REQUIRED_FIELD_MESSAGE } from '@/constants/form'

const registerFormSchema = z.object({
  name: z.string().min(3, REQUIRED_FIELD_MESSAGE),
  email: z.email('E-mail inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export const Signup = () => {
  const signup = useAuthStore((state) => state.signup)

  const [showPassword, setShowPassword] = useState(false)
  const [signUpError, setSignUpError] = useState('')
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true)
    setSignUpError('')

    try {
      await signup(data)
    } catch (error) {
      console.log(error)
      setSignUpError('* E-mail já cadastrado.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center gap-6">
      <img src={logo} className="w-32 h-8" />
      <Card className="w-full max-w-md rounded-xl">
        <CardHeader className="flex flex-col items-center justify-center">
          <CardTitle className="text-xl font-bold color-foreground">
            Criar conta
          </CardTitle>
          <CardDescription>
            Comece a controlar suas finanças ainda hoje
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <form
            className="space-y-6 w-full"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-4">
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
                      <InputGroupAddon>
                        <UserRound className={error ? 'text-(--danger)' : ''} />
                      </InputGroupAddon>

                      <InputGroupInput
                        id="name"
                        type="text"
                        placeholder="Seu nome completo"
                        value={value}
                        required
                        onChange={onChange}
                      />
                    </InputGroup>

                    {error && (
                      <span className="text-xs text-(--gray-500)">
                        {error.message}
                      </span>
                    )}
                  </div>
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email" aria-invalid={!!error}>
                      E-mail
                    </Label>
                    <InputGroup data-state={value ? 'filled' : 'empty'}>
                      <InputGroupAddon>
                        <Mail className={error ? 'text-(--danger)' : ''} />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="email"
                        type="email"
                        placeholder="mail@exemplo.com"
                        value={value}
                        required
                        onChange={(e) => {
                          setSignUpError('')
                          onChange(e)
                        }}
                      />
                    </InputGroup>

                    {error && (
                      <span className="text-xs text-(--gray-500)">
                        {error.message}
                      </span>
                    )}
                  </div>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="password" aria-invalid={!!error}>
                      Senha
                    </Label>

                    <InputGroup data-state={value ? 'filled' : 'empty'}>
                      <InputGroupAddon>
                        <Lock className={error ? 'text-(--danger)' : ''} />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Digite sua senha"
                        value={value}
                        required
                        onChange={onChange}
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          size="icon-xs"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Eye /> : <EyeClosed />}
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>

                    <span className="text-xs text-(--gray-500)">
                      A senha deve ter no mínimo 8 caracteres
                    </span>
                  </div>
                )}
              />
            </div>

            <div className="flex flex-col gap-2">
              {signUpError && (
                <span className="text-xs text-(--danger)">{signUpError}</span>
              )}

              <Button
                type="submit"
                size="xl"
                className="w-full"
                disabled={loading}
              >
                Cadastrar
              </Button>
            </div>
          </form>

          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-3 items-center w-full">
            <Separator />
            <span className="text-sm text-gray-500">ou</span>
            <Separator />
          </div>

          <div className="flex flex-col items-center gap-4 w-full">
            <p className="text-sm text-muted-foreground">Já tem uma conta?</p>

            <Button variant="outline" size="xl" className="w-full" asChild>
              <Link to="/">
                <LogIn />
                Fazer login
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
