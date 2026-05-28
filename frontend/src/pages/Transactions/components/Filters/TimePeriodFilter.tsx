import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const TimePeriodFilter = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor="time-period-select">Categoria</Label>

      <Select defaultValue="may26">
        <SelectTrigger className="h-12 w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          position="popper"
          className="w-auto border border-border mt-1"
        >
          <SelectGroup>
            <SelectItem value="jun25">Junho / 2025</SelectItem>
            <SelectItem value="jul25">Julho / 2025</SelectItem>
            <SelectItem value="aug25">Agosto / 2025</SelectItem>
            <SelectItem value="sep25">Setembro / 2025</SelectItem>
            <SelectItem value="oct25">Outubro / 2025</SelectItem>
            <SelectItem value="nov25">Novembro / 2025</SelectItem>
            <SelectItem value="dec25">Dezembro / 2025</SelectItem>
            <SelectItem value="jan26">Janeiro / 2026</SelectItem>
            <SelectItem value="feb26">Fevereiro / 2026</SelectItem>
            <SelectItem value="mar26">Março / 2026</SelectItem>
            <SelectItem value="apr26">Abril / 2026</SelectItem>
            <SelectItem value="may26">Maio / 2026</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
