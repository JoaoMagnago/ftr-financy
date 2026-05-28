import { Plus } from 'lucide-react'
import { Button } from './ui/button'

export const Header = ({
  title,
  description,
  buttonLabel,
}: {
  title: string
  description: string
  buttonLabel: string
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-md text-muted-foreground">{description}</p>
      </div>

      <Button>
        <Plus />
        <span>{buttonLabel}</span>
      </Button>
    </div>
  )
}
