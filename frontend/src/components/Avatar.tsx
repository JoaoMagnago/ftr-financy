export const Avatar = ({ name }: { name?: string }) => {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
      <span className="text-sm font-medium text-white">
        {name?.slice(0, 2).toUpperCase() || 'US'}
      </span>
    </div>
  )
}
