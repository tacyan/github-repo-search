import { searchRepositories } from "@/lib/github"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ErrorMessage } from "@/components/ErrorMessage"
import dynamic from "next/dynamic"
import { ClientSortComponent } from "../components/ClientSortComponent"

const RepositoryList = dynamic(() => import("@/components/RepositoryList"), {
  loading: () => <p>Loading...</p>,
})

export default async function SearchResults({
  searchParams,
}: {
  searchParams: { q: string; page?: string; sort?: string; order?: "asc" | "desc" }
}) {
  const { q, page: pageStr = "1", sort = "", order = "desc" } = await searchParams
  
  const page = Number.parseInt(pageStr, 10)

  try {
    const { items, total_count } = await searchRepositories(q, page, sort, order)

    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search Results for &quot;{q}&quot;</h1>
          <div className="mb-4">
            <ClientSortComponent 
              defaultSort={sort} 
              defaultOrder={order} 
              searchParams={searchParams}
            />
          </div>
          <RepositoryList
            repositories={items}
            totalCount={total_count}
            currentPage={page}
            query={q}
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

