import { getRepository, getReadme, getContributors } from "@/lib/github"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ErrorMessage } from "@/components/ErrorMessage"
import ReactMarkdown from "react-markdown"
import RepositoryDetails from "@/components/RepositoryDetails"

export default async function RepositoryDetail({ params }: { params: { owner: string; name: string } }) {
  try {
    const [repo, readmeData, contributors] = await Promise.all([
      getRepository(params.owner, params.name),
      getReadme(params.owner, params.name),
      getContributors(params.owner, params.name),
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
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown>{readmeData.content}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contributors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {contributors.slice(0, 10).map((contributor) => (
                  <div key={contributor.login} className="flex items-center gap-2">
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

