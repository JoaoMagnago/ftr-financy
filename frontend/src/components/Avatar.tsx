export const Avatar = ({ name }: { name?: string }) => {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-(--gray-300) cursor-pointer hover:scale-105 transition-transform">
      <span className="text-sm font-medium text-input-color">
        {name?.slice(0, 2).toUpperCase() || 'US'}
      </span>
    </div>
  )
}
