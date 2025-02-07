import type { Repository, SearchResult, Contributor, ReadmeContent } from "@/types/github"

const GITHUB_API_URL = "https://api.github.com"

export async function searchRepositories(
  query: string,
  page = 1,
  sort = "",
  order: "asc" | "desc" = "desc",
): Promise<SearchResult> {
  let url = `${GITHUB_API_URL}/search/repositories?q=${encodeURIComponent(query)}&page=${page}`
  if (sort) {
    url += `&sort=${sort}&order=${order}`
  }

  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
    next: { revalidate: 60 }, // Cache for 60 seconds
  })

  if (!res.ok) {
    throw new Error("Failed to fetch repositories")
  }

  return res.json()
}

export async function getRepository(owner: string, name: string): Promise<Repository> {
  const res = await fetch(`${GITHUB_API_URL}/repos/${owner}/${name}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
    next: { revalidate: 300 }, // Cache for 5 minutes
  })

  if (!res.ok) {
    throw new Error("Failed to fetch repository details")
  }

  return res.json()
}

export async function getReadme(owner: string, name: string): Promise<ReadmeContent> {
  const res = await fetch(`${GITHUB_API_URL}/repos/${owner}/${name}/readme`, {
    headers: {
      Accept: "application/vnd.github.v3.raw",
    },
    next: { revalidate: 300 }, // Cache for 5 minutes
  })

  if (!res.ok) {
    throw new Error("Failed to fetch README")
  }

  const content = await res.text()
  return { content }
}

export async function getContributors(owner: string, name: string): Promise<Contributor[]> {
  const res = await fetch(`${GITHUB_API_URL}/repos/${owner}/${name}/contributors`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
    next: { revalidate: 300 }, // Cache for 5 minutes
  })

  if (!res.ok) {
    throw new Error("Failed to fetch contributors")
  }

  return res.json()
}

