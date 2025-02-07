"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"

interface SortOptionsProps {
  currentSort: string
  currentOrder: "asc" | "desc"
}

export function SortOptions({ currentSort, currentOrder }: SortOptionsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const [sort, order] = value.split("-")
    params.set("sort", sort)
    params.set("order", order)
    router.push(`/search?${params.toString()}`)
  }

  const sortValue = `${currentSort}-${currentOrder}`

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-select" className="text-sm font-medium">
        Sort by:
      </label>
      <Select value={sortValue} onValueChange={handleSortChange}>
        <SelectTrigger id="sort-select" className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="stars-desc">Most Stars</SelectItem>
          <SelectItem value="stars-asc">Least Stars</SelectItem>
          <SelectItem value="updated-desc">Recently Updated</SelectItem>
          <SelectItem value="updated-asc">Least Recently Updated</SelectItem>
          <SelectItem value="forks-desc">Most Forks</SelectItem>
          <SelectItem value="forks-asc">Least Forks</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

