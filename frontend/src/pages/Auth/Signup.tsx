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

const registerFormSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export const Signup = () => {
  const signup = useAuthStore((state) => state.signup)

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true)

    try {
      await signup(data)
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
                render={({ field: { value, onChange } }) => (
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <InputGroup data-state={value ? 'filled' : 'empty'}>
                      <InputGroupInput
                        id="name"
                        type="text"
                        placeholder="Seu nome completo"
                        value={value}
                        required
                        onChange={onChange}
                      />
                      <InputGroupAddon>
                        <UserRound />
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                )}
              />

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

            <Button
              type="submit"
              size="xl"
              className="w-full"
              disabled={loading}
            >
              Cadastrar
            </Button>
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
