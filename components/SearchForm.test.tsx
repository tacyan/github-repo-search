import { render, screen, fireEvent } from "@testing-library/react"
import SearchForm from "./SearchForm"

const mockPush = jest.fn()

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: mockPush,
    }
  },
}))

describe("SearchForm", () => {
  it("renders correctly", () => {
    render(<SearchForm />)
    expect(screen.getByRole("searchbox")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "検索" })).toBeInTheDocument()
  })

  it("submits the form with the entered query", () => {
    render(<SearchForm />)

    const input = screen.getByRole("searchbox")
    fireEvent.change(input, { target: { value: "react" } })

    const button = screen.getByRole("button", { name: "検索" })
    fireEvent.click(button)

    expect(mockPush).toHaveBeenCalledWith("/search?q=react")
  })
})

