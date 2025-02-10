import { render, screen } from "@testing-library/react"
import { RepositoryList } from "./RepositoryList"
import { ReactNode } from "react"

// Lucideアイコンのモック
jest.mock('lucide-react', () => ({
  Star: () => <div data-testid="star-icon" />,
  ChevronDown: () => <div data-testid="chevron-down-icon" />,
  ChevronUp: () => <div data-testid="chevron-up-icon" />,
  ChevronLeft: () => <div data-testid="chevron-left-icon" />,
  ChevronRight: () => <div data-testid="chevron-right-icon" />,
}))

// Next.jsの機能をモック
jest.mock('next/link', () => {
  return ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
})

// UIコンポーネントのモック
jest.mock("@/components/ui/badge", () => ({
  Badge: ({ children, variant }: { children: ReactNode; variant?: string }) => (
    <div data-testid="badge" data-variant={variant}>{children}</div>
  ),
}))

jest.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children: ReactNode }) => <div data-testid="card">{children}</div>,
  CardHeader: ({ children }: { children: ReactNode }) => <div data-testid="card-header">{children}</div>,
  CardContent: ({ children }: { children: ReactNode }) => <div data-testid="card-content">{children}</div>,
  CardTitle: ({ children, className }: { children: ReactNode; className?: string }) => (
    <div data-testid="card-title" className={className}>{children}</div>
  ),
}))

// Paginationコンポーネントのモック
jest.mock("./Pagination", () => ({
  Pagination: ({ totalCount, currentPage, query }: { 
    totalCount: number; 
    currentPage: number; 
    query: string 
  }) => (
    <div data-testid="pagination">
      Pagination: {totalCount} {currentPage} {query}
    </div>
  ),
}))

const mockRepositories = [
  {
    id: 1,
    name: "repo1",
    full_name: "user/repo1",
    description: "description1",
    html_url: "https://github.com/user/repo1",
    stargazers_count: 100,
    watchers_count: 100,
    forks_count: 50,
    open_issues_count: 10,
    language: "TypeScript",
    owner: {
      login: "user",
      avatar_url: "https://github.com/user.png",
      html_url: "https://github.com/user",
    },
    private: false,
    default_branch: "main",
  },
  {
    id: 2,
    name: "repo2",
    full_name: "user/repo2",
    description: "description2",
    html_url: "https://github.com/user/repo2",
    stargazers_count: 200,
    watchers_count: 200,
    forks_count: 100,
    open_issues_count: 20,
    language: "JavaScript",
    owner: {
      login: "user",
      avatar_url: "https://github.com/user.png",
      html_url: "https://github.com/user",
    },
    private: false,
    default_branch: "main",
  },
]

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    toString: () => "",
    get: () => "",
  }),
}))

describe("RepositoryList", () => {
  it("renders correctly", () => {
    render(
      <RepositoryList 
        repositories={mockRepositories} 
        totalCount={2} 
        currentPage={1}
        query="test"
        sort="stars"
        order="desc"
      />
    )

    expect(screen.getByText("repo1")).toBeInTheDocument()
    expect(screen.getByText("repo2")).toBeInTheDocument()
    expect(screen.getByText("description1")).toBeInTheDocument()
    expect(screen.getByText("description2")).toBeInTheDocument()
  })

  // 新しいテストケース：検索結果が0件の場合のエラーメッセージを確認
  it("displays error message when no repositories are found", () => {
    render(
      <RepositoryList 
        repositories={[]} 
        totalCount={0} 
        currentPage={1}
        query="nonexistent"
        sort="stars"
        order="desc"
      />
    )
    
    expect(
      screen.getByText("検索結果が見つかりませんでした。別のキーワードで試してみてください。")
    ).toBeInTheDocument()
  })
})

