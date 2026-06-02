import { cva } from 'class-variance-authority'

const buttonVariants = cva(
  `
  group/button inline-flex shrink-0
  items-center justify-center rounded-md
  border border-transparent radius(--radius-md)
  bg-clip-padding text-sm font-medium
  outline-none select-none cursor-pointer
  whitespace-nowrap transition-all
  
  focus-visible:border-ring
  focus-visible:ring-3
  focus-visible:ring-ring/50
  
  active:not-aria-[haspopup]:translate-y-px

  disabled:opacity-50
  disabled:cursor-not-allowed

  data-[disabled=true]:opacity-50
  data-[disabled=true]:cursor-not-allowed

  aria-invalid:border-destructive
  aria-invalid:ring-3
  aria-invalid:ring-destructive/20

  dark:aria-invalid:border-destructive/50
  dark:aria-invalid:ring-destructive/40

  [&_svg]:pointer-events-none
  [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
  `,
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground enabled:hover:bg-(--button-primary-background-hover)',
        outline:
          'border-(--button-secondary-border) bg-(--button-secondary-background) text-(--button-secondary-foreground) enabled:hover:bg-muted enabled:hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:enabled:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground enabled:hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'enabled:hover:bg-muted enabled:hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:enabled:hover:bg-muted/50',
        destructive:
          'bg-destructive/10 text-destructive enabled:hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:enabled:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-muted-foreground font-medium underline-offset-4 hover:underline hover:text-primary data-[disabled=true]:hover:no-underline data-[disabled=true]:hover:text-muted-foreground',
      },
      size: {
        default: 'gap-2 px-4 py-3',
        xs: 'h-6 gap-1 px-2 text-xs',
        sm: 'h-8 gap-2 px-3 py-2',
        lg: 'h-10 gap-2 px-2.5',
        xl: 'h-12 gap-3 text-md font-medium px-3',
        icon: 'size-9',
        'icon-xs': "size-6 [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export { buttonVariants }
