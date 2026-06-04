import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'h-12 w-full min-w-0 rounded-(--input-radius) text-(--input-color) border border-input bg-transparent px-2.5 py-1 text-base outline-none placeholder:text-(--input-placeholder)',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
