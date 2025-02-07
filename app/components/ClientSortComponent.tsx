'use client'

import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ClientSortComponentProps {
  defaultSort: string
  defaultOrder: string
  searchParams: { q: string; page?: string; sort?: string; order?: "asc" | "desc" }
  className?: string
}

export function ClientSortComponent({ 
  defaultSort, 
  defaultOrder, 
  searchParams,
  className 
}: ClientSortComponentProps) {
  const router = useRouter()

  const onSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams as any)
    const [sort, order] = value.split('-')
    
    params.set('sort', sort)
    params.set('order', order)
    
    router.push(`/search?${params.toString()}`)
  }

  const currentValue = `${defaultSort}-${defaultOrder}`

  return (
    <Select value={currentValue} onValueChange={onSortChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="並び替え" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>ソート順</SelectLabel>
          <SelectItem value="stars-desc">Stars (高い順)</SelectItem>
          <SelectItem value="stars-asc">Stars (低い順)</SelectItem>
          <SelectItem value="updated-desc">更新日 (新しい順)</SelectItem>
          <SelectItem value="updated-asc">更新日 (古い順)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
} 