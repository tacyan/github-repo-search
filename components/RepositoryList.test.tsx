import { render, screen } from "@testing-library/react"
import { RepositoryList } from "./RepositoryList"

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
  Pagination: ({ totalCount, currentPage, query }) => (
    <div data-testid="pagination">
      Pagination: {totalCount} {currentPage} {query}
    </div>
  ),
}))

const mockRepositories = [
  {
    id: 1,
    name: "repo1",
    description: "description1",
    html_url: "https://github.com/user/repo1",
    stargazers_count: 100,
    language: "TypeScript",
    owner: {
      login: "user",
      avatar_url: "https://github.com/user.png",
    },
  },
  {
    id: 2,
    name: "repo2",
    description: "description2",
    html_url: "https://github.com/user/repo2",
    stargazers_count: 200,
    language: "JavaScript",
    owner: {
      login: "user",
      avatar_url: "https://github.com/user.png",
    },
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
})

