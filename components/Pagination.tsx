"use client"

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
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ totalCount, currentPage, query, sort, order, totalPages, onPageChange }: PaginationProps) {
  const maxPages = Math.min(totalPages, 34) // GitHub API limits to 1000 results (about 34 pages)

  const getPageNumbers = () => {
    const delta = 5 // 前後に表示するページ数
    const range = []
    const rangeWithDots = []

    // 範囲の開始と終了を計算
    let start = Math.max(2, currentPage - delta)
    let end = Math.min(totalPages - 1, currentPage + delta)

    // 最初のページは常に表示
    if (start > 2) {
      rangeWithDots.push(1)
      if (start > 3) {
        rangeWithDots.push('...')
      }
    }

    // ページ番号を生成
    for (let i = start; i <= end; i++) {
      rangeWithDots.push(i)
    }

    // 最後のページ番号の処理
    if (end < totalPages - 1) {
      if (end < totalPages - 2) {
        rangeWithDots.push('...')
      }
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const getPageUrl = (page: number) => {
    let url = `/search?q=${query}&page=${page}`
    if (sort) {
      url += `&sort=${sort}&order=${order}`
    }
    return url
  }

  if (totalPages <= 1) return null

  return (
    <nav className="flex justify-center items-center gap-2 my-8" aria-label="ページナビゲーション">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="前のページ"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getPageNumbers().map((pageNumber, index) => (
        pageNumber === '...' ? (
          <span key={`dots-${index}`} className="px-2">...</span>
        ) : (
          <Button
            key={pageNumber}
            variant={currentPage === pageNumber ? "default" : "outline"}
            onClick={() => onPageChange(Number(pageNumber))}
            aria-label={`ページ ${pageNumber}`}
            aria-current={currentPage === pageNumber ? "page" : undefined}
          >
            {pageNumber}
          </Button>
        )
      ))}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="次のページ"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
}

