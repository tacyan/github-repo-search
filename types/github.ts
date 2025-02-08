export interface Repository {
  id: number
  name: string
  full_name: string
  owner: {
    login: string
    avatar_url: string
    html_url: string
  }
  description: string
  html_url: string
  stargazers_count: number
  watchers_count: number
  forks_count: number
  open_issues_count: number
  language: string
  private: boolean
  topics?: string[]
  homepage?: string
  default_branch: string
}

export interface SearchResult {
  total_count: number
  items: Repository[]
}

export interface Contributor {
  login: string
  avatar_url: string
  contributions: number
}

export interface ReadmeContent {
  content: string
}

