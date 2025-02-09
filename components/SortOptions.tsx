"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

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

  const handleClearFilters = () => {
    const q = searchParams.get("q") || ""
    const tokens = q.split(" ").filter(token => {
      return !token.startsWith("language:") && !token.startsWith("stars:")
    })
    const newQuery = tokens.join(" ").trim()

    const currentSort = searchParams.get("sort") || "stars"
    const currentOrder = searchParams.get("order") || "desc"

    router.push(
      `/search?q=${encodeURIComponent(newQuery)}&sort=${currentSort}&order=${currentOrder}`
    )
  }

  const sortValue = `${currentSort}-${currentOrder}`

  return (
    <div className="filter-options">
      <div className="star-filter">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleClearFilters}>
            クリア
          </Button>
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
      </div>

      <div className="language-filter">
        {/* ... プログラミング言語で絞り込むボタン等の実装 ... */}
      </div>
    </div>
  )
}

