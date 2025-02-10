"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import type { Repository } from "@/types/github"
import { Pagination } from "@/components/Pagination"
import { useRouter } from "next/navigation"

interface RepositoryListProps {
  repositories: Repository[]
  totalCount: number
  currentPage: number
  query: string
  sort: string
  order: "asc" | "desc"
}

export function RepositoryList({ repositories, totalCount, currentPage, query, sort, order }: RepositoryListProps) {
  const router = useRouter()

  const handlePageChange = async (page: number) => {
    const searchParams = new URLSearchParams({
      q: query,
      page: page.toString(),
      sort: sort,
      order: order,
    })
    router.push(`/search?${searchParams.toString()}`)
  }

  const totalPages = Math.ceil(totalCount / 30) // GitHub API returns 30 items per page

  return (
    <div className="flex flex-col space-y-6">
      <p className="mb-4" aria-live="polite">
        Total results: {totalCount}
      </p>
      {repositories.length === 0 ? (
        <div role="alert">
          検索結果が見つかりませんでした。別のキーワードで試してみてください。
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8" role="list">
          {repositories.map((repo) => (
            <li key={repo.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">
                    <Link href={`/repository/${repo.owner.login}/${repo.name}`} className="hover:underline">
                      <span aria-label={`Repository: ${repo.name}`}>{repo.name}</span>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">{repo.description}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary">{repo.language}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span>{repo.stargazers_count.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-2">
          {/* 1000件制限を考慮したページネーション */}
          {Array.from({ length: Math.min(Math.ceil(totalCount / 30), 34) }, (_, i) => (
            <Link
              key={i + 1}
              href={{
                pathname: '/search',
                query: {
                  q: query,
                  page: i + 1,
                  sort,
                  order,
                },
              }}
              className={`px-3 py-2 rounded-md ${
                currentPage === i + 1
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background hover:bg-muted'
              }`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
        {totalCount > 1000 && (
          <p className="text-sm text-muted-foreground">
            GitHubの制限により最初の1000件のみ表示可能です
          </p>
        )}
      </div>
    </div>
  )
}

