import { searchRepositories } from "@/lib/github"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ErrorMessage } from "@/components/ErrorMessage"
import dynamic from "next/dynamic"
import { ClientSortComponent } from "../components/ClientSortComponent"
import SearchForm from "@/components/SearchForm"
import SortOptions from "@/components/SortOptions"

const RepositoryList = dynamic(() => import("@/components/RepositoryList"), {
  loading: () => <p>Loading...</p>,
})

export default async function SearchResults({
  searchParams,
}: {
  searchParams: { q?: string; sort?: string; page?: string }
}) {
  // Step 1: searchParamsを非同期で安全に処理する関数
  const getSearchParamsValue = async (key: keyof typeof searchParams) => {
    // 非同期コンテキストを確保
    const params = await (async () => searchParams)();
    return params[key];
  };

  // Step 2: パラメータを並行して取得
  const [rawQuery, rawSort, rawPage] = await Promise.all([
    getSearchParamsValue('q'),
    getSearchParamsValue('sort'),
    getSearchParamsValue('page'),
  ]);

  // Step 3: 取得した値を適切な型に変換
  const query = String(rawQuery ?? '');
  const sort = String(rawSort ?? '');
  const page = Number(rawPage ?? 1);

  try {
    const { items, total_count } = await searchRepositories(
      query,
      page,
      sort,
      'desc'
    )

    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="sr-only">GitHub Repository Search Results</h1>
          
          <div className="mb-8">
            <SearchForm initialQuery={query} />
          </div>

          {query && (
            <h2 className="text-2xl font-bold mb-6">
              Search Results for "{query}"
            </h2>
          )}

          <div className="mb-6">
            <SortOptions currentSort={sort} />
          </div>

          <RepositoryList
            repositories={items}
            totalCount={total_count}
            currentPage={page}
            query={query}
            sort={sort}
            order="desc"
          />
        </main>
        <Footer />
      </div>
    )
  } catch (error) {
    console.error('Error fetching repositories:', error)
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <ErrorMessage title="Error" message="Failed to fetch repositories. Please try again later." />
        </main>
        <Footer />
      </div>
    )
  }
}

