'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Field } from '@/components/ui/field'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'

export function TransactionDatePicker({
  date,
  setDate,
}: {
  date: Date | undefined
  setDate: (date: Date) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <Field className="mx-auto w-44">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            size="xl"
            variant="outline"
            className={`justify-start font-normal ${date ? 'text-(--input-color)' : 'text-(--input-placeholder)'}`}
          >
            {date ? date.toLocaleDateString() : 'Selecione'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            captionLayout="dropdown"
            disabled={{ after: new Date() }}
            onSelect={(selectedDate) => {
              if (selectedDate) {
                setDate(selectedDate)
              }
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
