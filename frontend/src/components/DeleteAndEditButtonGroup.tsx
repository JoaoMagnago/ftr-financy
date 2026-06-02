import { SquarePen, Trash } from 'lucide-react'
import { Button } from './ui/button'

export const DeleteAndEditButtonGroup = ({
  onDelete,
  onEdit,
}: {
  onDelete: () => void
  onEdit: () => void
}) => {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button variant="outline" size="icon-sm" onClick={onDelete}>
        <Trash className="text-(--danger)" />
      </Button>
      <Button variant="outline" size="icon-sm" onClick={onEdit}>
        <SquarePen className="text-(--icon-button-foreground)" />
      </Button>
    </div>
  )
}
