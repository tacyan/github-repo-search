'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SortComponentProps {
  className?: string
}

export function SortComponent({ className }: SortComponentProps) {
  const onSortChange = (value: string) => {
    // ... 処理
  }

  return (
    <Select onValueChange={onSortChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="並び替え" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>ソート順</SelectLabel>
          <SelectItem value="newest">新しい順</SelectItem>
          <SelectItem value="oldest">古い順</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
} 