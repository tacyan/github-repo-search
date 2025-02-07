"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchFormProps {
  initialQuery?: string;
}

export default function SearchForm({ initialQuery = '' }: SearchFormProps) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div className="flex justify-center w-full">
      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl" role="search">
        <Input
          type="search"
          placeholder="リポジトリを検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow"
          aria-label="リポジトリ検索"
        />
        <Button type="submit">検索</Button>
      </form>
    </div>
  )
}

