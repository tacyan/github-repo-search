import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { SearchForm } from "@/components/SearchForm"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">GitHub Repository Search</h1>
        <div className="flex justify-center w-full">
          <div className="w-full max-w-2xl">
            <SearchForm initialQuery="" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

