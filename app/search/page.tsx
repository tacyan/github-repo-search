import { searchRepositories } from "@/lib/github"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { RepositoryList } from "@/components/RepositoryList"
import { ErrorMessage } from "@/components/ErrorMessage"
import { SortOptions } from "@/components/SortOptions"
import { SearchForm } from "@/components/SearchForm"

interface SearchPageProps {
  searchParams: {
    q?: string
    page?: string
    sort?: string
    order?: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // searchParamsを非同期で安全に処理
  const params = await Promise.resolve(searchParams)
  
  const query = params.q || ""
  const currentPage = Number(params.page) || 1
  const sort = params.sort || "stars"
  const order = (params.order as "asc" | "desc") || "desc"

  if (!query) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="mb-8">
            <SearchForm initialQuery="" />
          </div>
          <ErrorMessage 
            title="No search query" 
            message="Please enter a search term to find repositories." 
          />
        </main>
        <Footer />
      </div>
    )
  }

  try {
    // まず総件数だけを取得
    const { total_count } = await searchRepositories(query, 1, sort, order)
    
    // 最大ページ数を計算（GitHub APIの制限：1000件まで）
    const maxResults = Math.min(total_count, 1000)
    const totalPages = Math.ceil(maxResults / 30)

    // 使用するページ番号を決定
    const pageToFetch = currentPage > totalPages ? totalPages : currentPage

    // データを取得
    const { items } = await searchRepositories(query, pageToFetch, sort, order)
    
    // データをシリアライズ
    const serializedItems = JSON.parse(JSON.stringify(items))
    const serializedTotalCount = JSON.parse(JSON.stringify(total_count))

    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="mb-8">
            <SearchForm initialQuery={query} />
          </div>
          {currentPage > totalPages && (
            <div className="mb-4">
              <ErrorMessage 
                title="Notice" 
                message={`Showing page ${totalPages} (last page) as requested page ${currentPage} exceeds available pages.`}
              />
            </div>
          )}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Found {serializedTotalCount.toLocaleString()} repositories
            </p>
            <SortOptions currentSort={sort} currentOrder={order} />
          </div>
          <RepositoryList 
            repositories={serializedItems}
            totalCount={serializedTotalCount}
            currentPage={pageToFetch}
            query={query}
            sort={sort}
            order={order}
          />
        </main>
        <Footer />
      </div>
    )
  } catch (error) {
    console.error('Search error:', error)
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="mb-8">
            <SearchForm initialQuery={query} />
          </div>
          <ErrorMessage 
            title="Error" 
            message="Failed to fetch repositories. Please try again later."
          />
        </main>
        <Footer />
      </div>
    )
  }
}

