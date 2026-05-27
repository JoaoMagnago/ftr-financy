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
  email: z.email(),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
})

type LoginFormData = z.infer<typeof loginFormSchema>

export function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const login = useAuthStore((state) => state.login)
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)

    try {
      await login(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center gap-6">
      <img src={logo} className="w-32 h-8" />
      <Card className="w-full max-w-md rounded-xl">
        <CardHeader className="flex flex-col items-center border-s-red-200 justify-center">
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
                render={({ field: { value, onChange } }) => (
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">E-mail</Label>
                    <InputGroup data-state={value ? 'filled' : 'empty'}>
                      <InputGroupInput
                        id="email"
                        type="email"
                        placeholder="mail@exemplo.com"
                        value={value}
                        required
                        onChange={onChange}
                      />
                      <InputGroupAddon>
                        <Mail />
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="password">Senha</Label>
                    <InputGroup data-state={value ? 'filled' : 'empty'}>
                      <InputGroupInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Digite sua senha"
                        value={value}
                        required
                        onChange={onChange}
                      />
                      <InputGroupAddon>
                        <Lock />
                      </InputGroupAddon>
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          onClick={() => setShowPassword(!showPassword)}
                          size="icon-xs"
                        >
                          {showPassword ? <Eye /> : <EyeClosed />}
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
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
                    htmlFor="terms-checkbox-invalid"
                  >
                    Lembrar-me
                  </FieldLabel>
                </Field>

                <span className="text-sm font-medium text-primary whitespace-nowrap cursor-pointer hover:underline">
                  Recuperar senha
                </span>
              </div>
            </div>

            <Button
              type="submit"
              size="xl"
              className="w-full"
              disabled={loading}
            >
              Entrar
            </Button>
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
