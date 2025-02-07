import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SortOptionsProps {
  currentSort: string
  onSortChange: (value: string) => void
}

export function SortOptions({ currentSort, onSortChange }: SortOptionsProps) {
  return (
    <Select value={currentSort} onValueChange={onSortChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="best-match">Best match</SelectItem>
        <SelectItem value="stars">Stars</SelectItem>
        <SelectItem value="forks">Forks</SelectItem>
        <SelectItem value="updated">Updated</SelectItem>
      </SelectContent>
    </Select>
  )
}

