"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getSearchSuggestions } from "@/lib/github"

interface SearchFormProps {
  initialQuery: string
  isSearchPage?: boolean
}

export function SearchForm({ initialQuery = "", isSearchPage = false }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const newQuery = searchParams.get("q") || "";
    setQuery(newQuery);
  }, [searchParams]);

  const fetchSuggestions = useCallback(async () => {
    if (isSearchPage) {
      setSuggestions([])
      return
    }

    if (query.length < 1) {
      setSuggestions([])
      return
    }

    try {
      if (query.includes(' ')) {
        setSuggestions([])
        return
      }

      const data = await getSearchSuggestions(query)
      setSuggestions(data)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      setSuggestions([])
    }
  }, [query, isSearchPage])

  useEffect(() => {
    const debounceTimer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounceTimer)
  }, [fetchSuggestions])

  const executeSearch = useCallback((searchQuery: string) => {
    const currentSort = searchParams.get('sort') || 'stars'
    const currentOrder = searchParams.get('order') || 'desc'
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}&sort=${currentSort}&order=${currentOrder}`)
  }, [searchParams, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    executeSearch(query)
    setShowSuggestions(false)
  }

  const updateQuery = (newQuery: string) => {
    setQuery(newQuery)
    if (isSearchPage && newQuery !== query) {
      const debounceTimer = setTimeout(() => {
        executeSearch(newQuery)
      }, 500)
      return () => clearTimeout(debounceTimer)
    }
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex gap-2" data-testid="search-form">
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search repositories..."
          value={query}
          onChange={(e) => updateQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          className="flex-1"
          aria-label="Search repositories"
        />
        <Button type="submit">Search</Button>
      </form>

      {!isSearchPage && showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => {
                updateQuery(suggestion)
                setShowSuggestions(false)
                inputRef.current?.focus()
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

