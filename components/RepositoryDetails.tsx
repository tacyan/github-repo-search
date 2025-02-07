import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarIcon, EyeIcon, GitForkIcon, CircleIcon } from "lucide-react"
import Image from "next/image"
import type { Repository } from "@/types/github"

interface RepositoryDetailsProps {
  repository: Repository
}

export default function RepositoryDetails({ repository }: RepositoryDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <Image
            src={repository.owner.avatar_url || "/placeholder.svg"}
            alt={repository.owner.login}
            width={64}
            height={64}
            className="rounded-full"
            priority
          />
          <div className="text-center sm:text-left">
            <CardTitle className="text-2xl sm:text-3xl">{repository.name}</CardTitle>
            <p className="text-gray-500">by {repository.owner.login}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{repository.description}</p>
        <div className="flex flex-wrap gap-4 mb-4">
          <Badge variant="secondary" className="flex items-center gap-1">
            <CircleIcon className="w-4 h-4" />
            <span>{repository.language}</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <StarIcon className="w-4 h-4" />
            <span>{repository.stargazers_count} stars</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <EyeIcon className="w-4 h-4" />
            <span>{repository.watchers_count} watchers</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <GitForkIcon className="w-4 h-4" />
            <span>{repository.forks_count} forks</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <CircleIcon className="w-4 h-4" />
            <span>{repository.open_issues_count} open issues</span>
          </Badge>
        </div>
        <a
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View on GitHub
        </a>
      </CardContent>
    </Card>
  )
}

