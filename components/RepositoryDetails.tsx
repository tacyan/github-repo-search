"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, GitFork, Eye, AlertCircle, GitBranch, Link as LinkIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Repository } from "@/types/github"

interface RepositoryDetailsProps {
  repository: Repository
}

export function RepositoryDetails({ repository }: RepositoryDetailsProps) {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-muted/50">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
              <Image
                src={repository.owner.avatar_url}
                alt={`${repository.owner.login}'s avatar`}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{repository.name}</h1>
                <Badge variant="outline" className="h-6">
                  {repository.private ? "Private" : "Public"}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                by{" "}
                <Link
                  href={repository.owner.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {repository.owner.login}
                </Link>
              </p>
              {repository.description && (
                <p className="text-lg mt-4">{repository.description}</p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                {repository.language && (
                  <Badge className="h-6">
                    <span className="w-2 h-2 rounded-full bg-primary mr-1.5" />
                    {repository.language}
                  </Badge>
                )}
                {repository.topics?.map((topic) => (
                  <Badge key={topic} variant="secondary" className="h-6">
                    {topic}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium">{repository.stargazers_count.toLocaleString()}</span>
                  <span className="text-muted-foreground">stars</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">{repository.watchers_count.toLocaleString()}</span>
                  <span className="text-muted-foreground">watching</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitFork className="w-5 h-5 text-green-500" />
                  <span className="font-medium">{repository.forks_count.toLocaleString()}</span>
                  <span className="text-muted-foreground">forks</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="font-medium">{repository.open_issues_count.toLocaleString()}</span>
                  <span className="text-muted-foreground">issues</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Link
                  href={repository.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-500 hover:underline"
                >
                  <LinkIcon className="w-4 h-4" />
                  View on GitHub
                </Link>
                {repository.homepage && (
                  <Link
                    href={repository.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-500 hover:underline"
                  >
                    <LinkIcon className="w-4 h-4" />
                    Homepage
                  </Link>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GitBranch className="w-4 h-4" />
                <span>Default branch: {repository.default_branch}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

