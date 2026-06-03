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
import { useAuthStore } from '@/stores/auth'
import { LogOut, Mail, UserRound } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Profile = () => {
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  const [username, setUsername] = useState('Usuário Exemplo')

  const unsavedName = 'Usuário Exemplo'
  const email = 'exemplo@email.com'

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-md rounded-xl">
        <CardHeader className="flex flex-col items-center gap-6 justify-center">
          <Avatar name={unsavedName} size="lg" />
          <div className="flex flex-col items-center gap-0.5">
            <CardTitle className="text-xl font-bold color-foreground">
              {unsavedName}
            </CardTitle>
            <CardDescription className="text-(--gray-500)">
              {email}
            </CardDescription>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="flex flex-col items-center gap-6">
          <form
            className="space-y-6 w-full"
            noValidate
            // onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nome completo</Label>
              <InputGroup data-state={username ? 'filled' : 'empty'}>
                <InputGroupInput
                  id="name"
                  type="text"
                  value={username}
                  placeholder="Seu nome completo"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <InputGroupAddon>
                  <UserRound />
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">E-mail</Label>
                <InputGroup data-disabled={true}>
                  <InputGroupInput
                    id="email"
                    type="email"
                    value={email}
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
                // disabled={loading}
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
