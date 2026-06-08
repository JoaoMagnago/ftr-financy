import type { ResolveColorsOutput } from '@/utils/resolveColor'

export const CategoryLabel = ({
  name,
  colors,
}: {
  name: string
  colors: ResolveColorsOutput
}) => {
  return (
    <div
      className={`flex items-center justify-center text-sm font-medium rounded-full w-fit py-1 px-3 ${colors.lightBg} ${colors.baseText}`}
    >
      {name}
    </div>
  )
}
