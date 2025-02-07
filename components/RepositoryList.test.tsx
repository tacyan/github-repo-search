import { render, screen } from "@testing-library/react"
import RepositoryList from "./RepositoryList"

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
    render(<RepositoryList repositories={mockRepositories} totalCount={2} currentPage={1} query="test" />)

    expect(screen.getByText("Total results: 2")).toBeInTheDocument()
    expect(screen.getByText("repo1")).toBeInTheDocument()
    expect(screen.getByText("repo2")).toBeInTheDocument()
    expect(screen.getByText("JavaScript")).toBeInTheDocument()
    expect(screen.getByText("TypeScript")).toBeInTheDocument()
  })
})

