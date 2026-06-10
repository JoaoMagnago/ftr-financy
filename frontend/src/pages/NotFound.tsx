import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>

      <p className="text-muted-foreground">Página não encontrada</p>

      <Link to="/" className="text-primary hover:underline">
        Voltar para o início
      </Link>
    </div>
  )
}
