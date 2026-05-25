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
import { Link } from 'react-router-dom'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Lock, Mail } from 'lucide-react'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
        <CardContent>
          <form className="space-y-4">
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
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputGroupAddon>
                  <Lock />
                </InputGroupAddon>
              </InputGroup>
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className="w-full max-w-md rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Ainda não tem uma conta?
          </CardTitle>
          <CardDescription>Cadastre-se agora mesmo</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/signup"> Criar conta </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
