import type { ReactNode } from 'react'

export const Header = ({
  title,
  description,
  rightElement,
}: {
  title: string
  description: string
  rightElement?: ReactNode
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-md text-muted-foreground">{description}</p>
      </div>

      {rightElement}
    </div>
  )
}
