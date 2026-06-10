import { useState } from 'react'
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
import { Eye, EyeClosed, Lock, Mail, UserRoundPlus } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldLabel } from '@/components/ui/field'
import { Separator } from '@/components/ui/separator'
import { Link } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth'

import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import logo from '@/assets/logo.svg'

const loginFormSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
})

type LoginFormData = z.infer<typeof loginFormSchema>

export const Login = () => {
  const login = useAuthStore((state) => state.login)

  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setLoginError('')
    setLoading(true)

    try {
      await login(data)
    } catch (error) {
      console.log(error)
      setLoginError('* E-mail ou senha inválidos.')
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
            Fazer login
          </CardTitle>
          <CardDescription>Entre na sua conta para continuar</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <form
            className="space-y-6 w-full"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-4">
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
                      <InputGroupInput
                        id="email"
                        type="email"
                        placeholder="mail@exemplo.com"
                        value={value}
                        required
                        onChange={(e) => {
                          setLoginError('')
                          onChange(e)
                        }}
                      />
                      <InputGroupAddon>
                        <Mail className={error ? 'text-(--danger)' : ''} />
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
                      <InputGroupInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Digite sua senha"
                        value={value}
                        required
                        onChange={(e) => {
                          setLoginError('')
                          onChange(e)
                        }}
                      />
                      <InputGroupAddon>
                        <Lock className={error ? 'text-(--danger)' : ''} />
                      </InputGroupAddon>
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          size="icon-xs"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Eye /> : <EyeClosed />}
                        </InputGroupButton>
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

              <div className="flex items-center justify-between">
                <Field orientation="horizontal">
                  <Checkbox
                    id="remember-me-checkbox"
                    name="remember-me-checkbox"
                  />
                  <FieldLabel
                    className="font-normal"
                    htmlFor="remember-me-checkbox"
                  >
                    Lembrar-me
                  </FieldLabel>
                </Field>

                <span className="text-sm font-medium text-primary whitespace-nowrap cursor-pointer hover:underline">
                  Recuperar senha
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {loginError && (
                <span className="text-xs text-(--danger)">{loginError}</span>
              )}
              <Button
                type="submit"
                size="xl"
                className="w-full"
                disabled={loading}
              >
                Entrar
              </Button>
            </div>
          </form>

          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-3 items-center w-full">
            <Separator />
            <span className="text-sm text-gray-500">ou</span>
            <Separator />
          </div>

          <div className="flex flex-col items-center gap-4 w-full">
            <p className="text-sm text-muted-foreground">
              Ainda não tem uma conta?
            </p>

            <Button variant="outline" size="xl" className="w-full" asChild>
              <Link to="/signup">
                <UserRoundPlus />
                Criar conta
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
