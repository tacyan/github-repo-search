import { render, screen } from "@testing-library/react"
import RepositoryList from "./RepositoryList"

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
  return ({ children, href }) => <a href={href}>{children}</a>
})

// UIコンポーネントのモック
jest.mock("@/components/ui/badge", () => ({
  Badge: ({ children, variant }) => (
    <div data-testid="badge" data-variant={variant}>{children}</div>
  ),
}))

jest.mock("@/components/ui/card", () => ({
  Card: ({ children }) => <div data-testid="card">{children}</div>,
  CardHeader: ({ children }) => <div data-testid="card-header">{children}</div>,
  CardContent: ({ children }) => <div data-testid="card-content">{children}</div>,
  CardTitle: ({ children, className }) => (
    <div data-testid="card-title" className={className}>{children}</div>
  ),
}))

// Paginationコンポーネントのモック
jest.mock("./Pagination", () => ({
  __esModule: true,
  default: ({ totalCount, currentPage, query }) => (
    <div data-testid="pagination">
      Pagination: {totalCount} {currentPage} {query}
    </div>
  ),
}))

const mockRepositories = [
  {
    id: 1,
    name: "repo1",
    full_name: "user1/repo1",
    owner: { login: "user1", avatar_url: "https://example.com/avatar1.jpg" },
    description: "Description 1",
    html_url: "https://github.com/user1/repo1",
    stargazers_count: 100,
    watchers_count: 50,
    forks_count: 25,
    open_issues_count: 10,
    language: "JavaScript",
  },
  {
    id: 2,
    name: "repo2",
    full_name: "user2/repo2",
    owner: { login: "user2", avatar_url: "https://example.com/avatar2.jpg" },
    description: "Description 2",
    html_url: "https://github.com/user2/repo2",
    stargazers_count: 200,
    watchers_count: 100,
    forks_count: 50,
    open_issues_count: 20,
    language: "TypeScript",
  },
]

describe("RepositoryList", () => {
  it("renders correctly", () => {
    render(
      <RepositoryList 
        repositories={mockRepositories} 
        totalCount={2} 
        currentPage={1} 
        query="test"
        sort=""
        order="desc"
      />
    )

    expect(screen.getByText("Total results: 2")).toBeInTheDocument()
    expect(screen.getByText("repo1")).toBeInTheDocument()
    expect(screen.getByText("repo2")).toBeInTheDocument()
    expect(screen.getByText("JavaScript")).toBeInTheDocument()
    expect(screen.getByText("TypeScript")).toBeInTheDocument()
  })
})

