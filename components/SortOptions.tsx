"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"

interface SortOptionsProps {
  currentSort: string
}

export default function SortOptions({ currentSort }: SortOptionsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }
    router.push(`/search?${params.toString()}`);
  };

  return (
    <Select value={currentSort} onValueChange={handleSortChange}>
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

