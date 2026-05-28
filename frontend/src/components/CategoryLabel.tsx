export const CategoryLabel = ({ name }: { name: string }) => {
  return (
    <div className="flex items-center justify-center text-sm text-(--green-dark) font-medium rounded-full bg-(--green-light) w-fit py-1 px-3">
      {name}
    </div>
  )
}
