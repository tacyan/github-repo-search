"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchFormProps {
  initialQuery: string
}

export function SearchForm({ initialQuery }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query.trim()) return

    const searchParams = new URLSearchParams({
      q: query,
      sort: "stars",
      order: "desc",
    })
    router.push(`/search?${searchParams.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="search"
        placeholder="Search repositories..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1"
        aria-label="Search repositories"
      />
      <Button type="submit">Search</Button>
    </form>
  )
}

