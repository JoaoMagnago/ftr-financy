interface AvatarProps {
  name?: string
  className?: string
  isClickable?: boolean
  size?: 'md' | 'lg'
}

export const Avatar = ({
  name,
  className,
  isClickable = false,
  size = 'md',
}: AvatarProps) => {
  const sizeClasses = {
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-2xl',
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-(--gray-300) ${sizeClasses[size]} ${isClickable ? 'cursor-pointer hover:scale-105 transition-transform' : ''} ${className}`}
    >
      <span className="font-medium text-input-color">
        {name?.slice(0, 2).toUpperCase() || 'US'}
      </span>
    </div>
  )
}
