import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { LoadingSpinner } from "@/components/LoadingSpinner"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Loading repository details...</h1>
        <LoadingSpinner />
      </main>
      <Footer />
    </div>
  )
}

