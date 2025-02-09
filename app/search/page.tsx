import { searchRepositories } from "@/lib/github"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { RepositoryList } from "@/components/RepositoryList"
import { ErrorMessage } from "@/components/ErrorMessage"
import { SortOptions } from "@/components/SortOptions"
import { SearchForm } from "@/components/SearchForm"
import { SearchSuggestions } from "@/components/SearchSuggestions"
import { getPageErrorMessage } from "@/lib/utils"

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
            <SearchForm initialQuery="" isSearchPage={true} />
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
            <SearchForm initialQuery={query} isSearchPage={true} />
          </div>
          <div className="mb-8">
            <SearchSuggestions totalCount={serializedTotalCount} />
          </div>
          {currentPage > totalPages && (
            <div className="mb-4">
              <ErrorMessage 
                title="お知らせ" 
                message={getPageErrorMessage(currentPage, totalPages)}
              />
            </div>
          )}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <p className="text-sm text-muted-foreground">
              Found {serializedTotalCount.toLocaleString()} repositories
            </p>
            <SortOptions currentSort={sort} currentOrder={order} />
          </div>
          <div className="max-w-full overflow-hidden mb-8">
            <RepositoryList 
              repositories={serializedItems}
              totalCount={serializedTotalCount}
              currentPage={pageToFetch}
              query={query}
              sort={sort}
              order={order}
            />
          </div>
          {serializedTotalCount > 1000 && (
            <div className="mt-12 mb-8 flex justify-center">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg max-w-2xl text-center">
                <h3 className="font-bold mb-2">検索結果を絞り込むためのヒント：</h3>
                <ul className="list-none space-y-2">
                  <li>言語を指定: language:javascript</li>
                  <li>スター数で絞り込み: stars:&gt;1000</li>
                  <li>より具体的なキーワードを使用</li>
                </ul>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    )
  } catch (error) {
    console.error('Search error:', error)
    const errorMessage = getPageErrorMessage(currentPage, totalPages)
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="mb-8">
            <SearchForm initialQuery={query} isSearchPage={true} />
          </div>
          <ErrorMessage>
            {errorMessage}
          </ErrorMessage>
        </main>
        <Footer />
      </div>
    )
  }
}
