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

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  }

  // GitHubトークンが設定されている場合は、認証ヘッダーを追加
  if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
  }

  const res = await fetch(url, {
    headers,
    next: { revalidate: 60 }, // Cache for 60 seconds
  })

  if (!res.ok) {
    throw new Error("Failed to fetch repositories")
  }

  return res.json()
}

export async function getRepository(owner: string, name: string): Promise<Repository> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  }

  if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
  }

  const res = await fetch(`${GITHUB_API_URL}/repos/${owner}/${name}`, {
    headers,
    next: { revalidate: 300 }, // Cache for 5 minutes
  })

  if (!res.ok) {
    throw new Error("Failed to fetch repository details")
  }

  return res.json()
}

export async function getReadme(owner: string, name: string): Promise<ReadmeContent> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3.raw",
  }

  if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
  }

  const res = await fetch(`${GITHUB_API_URL}/repos/${owner}/${name}/readme`, {
    headers,
    next: { revalidate: 300 }, // Cache for 5 minutes
  })

  if (!res.ok) {
    throw new Error("Failed to fetch README")
  }

  const content = await res.text()
  return { content }
}

export async function getContributors(owner: string, name: string): Promise<Contributor[]> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  }

  if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
  }

  const res = await fetch(`${GITHUB_API_URL}/repos/${owner}/${name}/contributors`, {
    headers,
    next: { revalidate: 300 }, // Cache for 5 minutes
  })

  if (!res.ok) {
    throw new Error("Failed to fetch contributors")
  }

  return res.json()
}

export async function getSearchSuggestions(query: string): Promise<string[]> {
  if (!query.trim()) return []

  const searchParams = new URLSearchParams({
    q: `${query} in:name`,
    sort: 'stars',
    per_page: '5',
  })

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  }

  if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
  }

  const res = await fetch(`${GITHUB_API_URL}/search/repositories?${searchParams}`, {
    headers,
  })

  if (!res.ok) {
    throw new Error("Failed to fetch suggestions")
  }

  const data = await res.json()
  return data.items.map((item: any) => item.name)
}

