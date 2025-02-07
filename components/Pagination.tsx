import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  totalCount: number
  currentPage: number
  query: string
  sort: string
  order: "asc" | "desc"
}

export default function Pagination({ totalCount, currentPage, query, sort, order }: PaginationProps) {
  const totalPages = Math.ceil(totalCount / 30) // GitHub API returns 30 items per page
  const maxPages = Math.min(totalPages, 34) // GitHub API limits to 1000 results (about 34 pages)

  const pageNumbers = Array.from({ length: maxPages }, (_, i) => i + 1)
  const visiblePageNumbers = pageNumbers.filter(
    (num) => num === 1 || num === maxPages || (num >= currentPage - 1 && num <= currentPage + 1),
  )

  const getPageUrl = (page: number) => {
    let url = `/search?q=${query}&page=${page}`
    if (sort) {
      url += `&sort=${sort}&order=${order}`
    }
    return url
  }

  return (
    <nav className="flex justify-center items-center mt-8 gap-2" aria-label="Pagination">
      <Button variant="outline" size="icon" disabled={currentPage === 1} aria-label="Previous page" asChild>
        <Link href={getPageUrl(currentPage - 1)}>
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </Button>
      {visiblePageNumbers.map((page, index, array) => (
        <React.Fragment key={page}>
          {index > 0 && array[index - 1] !== page - 1 && <span className="px-2">...</span>}
          <Button
            variant={currentPage === page ? "default" : "outline"}
            aria-current={currentPage === page ? "page" : undefined}
            asChild
          >
            <Link href={getPageUrl(page)}>{page}</Link>
          </Button>
        </React.Fragment>
      ))}
      <Button variant="outline" size="icon" disabled={currentPage === maxPages} aria-label="Next page" asChild>
        <Link href={getPageUrl(currentPage + 1)}>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </Button>
    </nav>
  )
}

