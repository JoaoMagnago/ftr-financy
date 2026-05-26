import { useState } from 'react'
import logo from '@/assets/logo.svg'
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
import { Link } from 'react-router-dom'

export function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center gap-6">
      <img src={logo} className="w-32 h-8" />
      <Card className="w-full max-w-md rounded-xl">
        <CardHeader className="flex flex-col items-center border-s-red-200 justify-center">
          <CardTitle className="text-xl font-bold color-foreground">
            Criar conta
          </CardTitle>
          <CardDescription>
            Comece a controlar suas finanças ainda hoje
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <form className="space-y-6 w-full">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Nome completo</Label>
                <InputGroup data-state={name ? 'filled' : 'empty'}>
                  <InputGroupInput
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                  <InputGroupAddon>
                    <UserRound />
                  </InputGroupAddon>
                </InputGroup>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="email">E-mail</Label>
                <InputGroup data-state={email ? 'filled' : 'empty'}>
                  <InputGroupInput
                    id="email"
                    type="email"
                    placeholder="mail@exemplo.com"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputGroupAddon>
                    <Mail />
                  </InputGroupAddon>
                </InputGroup>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Senha</Label>
                <InputGroup data-state={password ? 'filled' : 'empty'}>
                  <InputGroupInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
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
                <span className="text-xs text-(--gray-500)">
                  A senha deve ter no mínimo 8 caracteres
                </span>
              </div>
            </div>

            <Button type="submit" size="xl" className="w-full">
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
