import { getRepository, getReadme, getContributors } from "@/lib/github"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ErrorMessage } from "@/components/ErrorMessage"
import ReactMarkdown from "react-markdown"
import RepositoryDetails from "@/components/RepositoryDetails"

export default async function RepositoryPage({ params }: { params: { owner: string; name: string } }) {
  const { owner, name } = await Promise.resolve(params);

  try {
    const [repo, readmeData, contributors] = await Promise.all([
      getRepository(owner, name),
      getReadme(owner, name),
      getContributors(owner, name),
    ])

    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <RepositoryDetails repository={repo} />

          <Card className="mb-8 mt-8">
            <CardHeader>
              <CardTitle>README</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="container mx-auto px-4 pb-20">
                <div className="prose prose-sm max-w-none overflow-x-auto">
                  <ReactMarkdown>{readmeData.content}</ReactMarkdown>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Contributors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-6 p-4">
                {contributors.slice(0, 10).map((contributor) => (
                  <div key={contributor.login} className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
                    <Image
                      src={contributor.avatar_url || "/placeholder.svg"}
                      alt={contributor.login}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span>{contributor.login}</span>
                    <span className="text-gray-500">({contributor.contributions})</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  } catch (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <ErrorMessage title="Error" message="Failed to fetch repository details. Please try again later." />
        </main>
        <Footer />
      </div>
    )
  }
}

