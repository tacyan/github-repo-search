import { getRepository, getReadme, getContributors } from "@/lib/github"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Image from "next/image"
import { ErrorMessage } from "@/components/ErrorMessage"
import { MarkdownContent } from "@/components/MarkdownContent"
import { RepositoryDetails } from "@/components/RepositoryDetails"
import { CardWrapper } from "@/components/CardWrapper"
import { ContributorCard } from "@/components/ContributorCard"
import type { Repository } from "@/types/github"

export default async function RepositoryPage({ params }: { params: { owner: string; name: string } }) {
  const { owner, name } = await Promise.resolve(params);

  try {
    const [repo, readmeData, contributors] = await Promise.all([
      getRepository(owner, name),
      getReadme(owner, name),
      getContributors(owner, name),
    ])

    // すべてのデータをシリアライズ
    const serializedRepo: Repository = JSON.parse(JSON.stringify(repo))
    const serializedReadme = JSON.parse(JSON.stringify(readmeData))
    const serializedContributors = JSON.parse(JSON.stringify(contributors))

    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <RepositoryDetails repository={serializedRepo} />

          <CardWrapper title="README" className="mb-8 mt-8">
            <div className="container mx-auto px-4 pb-20">
              <MarkdownContent content={serializedReadme.content} />
            </div>
          </CardWrapper>

          <CardWrapper title="Contributors" className="mb-8">
            <div className="flex flex-wrap gap-6 p-4">
              {serializedContributors.slice(0, 10).map((contributor) => (
                <ContributorCard
                  key={contributor.login}
                  login={contributor.login}
                  avatar_url={contributor.avatar_url}
                  contributions={contributor.contributions}
                />
              ))}
            </div>
          </CardWrapper>
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

