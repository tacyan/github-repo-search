import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import type { Repository } from "@/types/github"
import Pagination from "./Pagination"

interface RepositoryListProps {
  repositories: Repository[]
  totalCount: number
  currentPage: number
  query: string
  sort: string
  order: "asc" | "desc"
}

export default function RepositoryList({
  repositories,
  totalCount,
  currentPage,
  query,
  sort,
  order,
}: RepositoryListProps) {
  return (
    <div className="flex flex-col space-y-6">
      <p className="mb-4" aria-live="polite">
        Total results: {totalCount}
      </p>
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
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1" aria-hidden="true" />
                    <span aria-label={`${repo.stargazers_count} stars`}>{repo.stargazers_count}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
      <div className="mt-auto py-8">
        <Pagination totalCount={totalCount} currentPage={currentPage} query={query} sort={sort} order={order} />
      </div>
    </div>
  )
}

