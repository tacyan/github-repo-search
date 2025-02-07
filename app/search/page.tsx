import { searchRepositories } from "@/lib/github"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ErrorMessage } from "@/components/ErrorMessage"
import dynamic from "next/dynamic"
import { SortOptions } from "@/components/SortOptions"

const RepositoryList = dynamic(() => import("@/components/RepositoryList"), {
  loading: () => <p>Loading...</p>,
})

export default async function SearchResults({
  searchParams,
}: {
  searchParams: { q: string; page?: string; sort?: string; order?: "asc" | "desc" }
}) {
  const query = searchParams.q
  const page = Number.parseInt(searchParams.page || "1", 10)
  const sort = searchParams.sort || ""
  const order = searchParams.order || "desc"

  try {
    const { items, total_count } = await searchRepositories(query, page, sort, order)

    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search Results for &quot;{query}&quot;</h1>
          <div className="mb-4">
            <SortOptions
              currentSort={sort}
              onSortChange={(newSort) => {
                // This is a server component, so we can't use client-side navigation.
                // Instead, we'll reload the page with the new sort parameter.
                window.location.href = `/search?q=${query}&sort=${newSort}&order=${order}`
              }}
            />
          </div>
          <RepositoryList
            repositories={items}
            totalCount={total_count}
            currentPage={page}
            query={query}
            sort={sort}
            order={order}
          />
        </main>
        <Footer />
      </div>
    )
  } catch (error) {
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

