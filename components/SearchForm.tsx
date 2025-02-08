"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getSearchSuggestions } from "@/lib/github"

interface SearchFormProps {
  initialQuery: string
}

export function SearchForm({ initialQuery }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([])
        return
      }
      try {
        const results = await getSearchSuggestions(query)
        setSuggestions(results)
      } catch (error) {
        console.error('Failed to fetch suggestions:', error)
      }
    }

    const debounceTimer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query.trim()) return

    const searchParams = new URLSearchParams({
      q: query,
      sort: "stars",
      order: "desc",
    })
    router.push(`/search?${searchParams.toString()}`)
    setShowSuggestions(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setShowSuggestions(false)
    const searchParams = new URLSearchParams({
      q: suggestion,
      sort: "stars",
      order: "desc",
    })
    router.push(`/search?${searchParams.toString()}`)
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex gap-2" data-testid="search-form">
        <Input
          type="search"
          placeholder="Search repositories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          className="flex-1"
          aria-label="Search repositories"
        />
        <Button type="submit">Search</Button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

