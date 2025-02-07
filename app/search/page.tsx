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

    const handlePagination = () => {
      if (serializedTotalCount > 1000) {
        // 最大ページ数を10に制限（1ページ100件として）
        const maxPages = 10;
        setTotalPages(maxPages);
        
        // ユーザーへの通知メッセージを表示
        setNotification({
          type: 'info',
          message: '検索結果が1000件を超えています。より具体的な検索条件を使用することをお勧めします。'
        });
      }
    };
    
    // 検索条件の提案を表示するコンポーネント
    const SearchSuggestions = () => {
      if (serializedTotalCount <= 1000) return null;
      
      return (
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg max-w-2xl">
          <h3 className="font-bold mb-2">検索結果を絞り込むためのヒント：</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>言語を指定: language:javascript</li>
            <li>スター数で絞り込み: stars:>1000</li>
            <li>より具体的なキーワードを使用</li>
          </ul>
        </div>
      );
    };

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
          <div className="mb-16">
            <SearchSuggestions />
          </div>
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

