'use client';

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface SearchSuggestionsProps {
  totalCount: number
}

export default function SearchSuggestions({ totalCount }: SearchSuggestionsProps) {
  const router = useRouter()

  const languages = [
    "JavaScript",
    "Python",
    "Java",
    "TypeScript",
    "Go",
    "Rust"
  ]

  const starFilters = [
    { label: "100+ stars", filter: "stars:>100" },
    { label: "1000+ stars", filter: "stars:>1000" },
    { label: "10000+ stars", filter: "stars:>10000" }
  ]

  const handleSuggestionClick = (suggestion: string) => {
    const searchParams = new URLSearchParams(window.location.search)
    const currentQuery = searchParams.get("q") || ""
    
    // 現在のクエリに言語やスターフィルターを追加
    const newQuery = currentQuery 
      ? `${currentQuery} ${suggestion}`
      : suggestion

    searchParams.set("q", newQuery)
    router.push(`/search?${searchParams.toString()}`)
  }

  return (
    <div className="space-y-4">
      {totalCount > 1000 && (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
          <h3 className="font-bold mb-2">検索結果を絞り込むためのヒント：</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>言語を指定: language:javascript</li>
            <li>スター数で絞り込み: stars:&gt;1000</li>
            <li>より具体的なキーワードを使用</li>
          </ul>
        </div>
      )}
      
      <div>
        <h3 className="text-sm font-medium mb-2">人気のプログラミング言語:</h3>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <Button
              key={lang}
              variant="outline"
              size="sm"
              onClick={() => handleSuggestionClick(`language:${lang.toLowerCase()}`)}
            >
              {lang}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">スター数で絞り込み:</h3>
        <div className="flex flex-wrap gap-2">
          {starFilters.map((filter) => (
            <Button
              key={filter.filter}
              variant="outline"
              size="sm"
              onClick={() => handleSuggestionClick(filter.filter)}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
} 