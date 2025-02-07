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
    expect(screen.getByRole("textbox")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument()
  })

  it("submits the form with the entered query", () => {
    render(<SearchForm />)

    const input = screen.getByRole("textbox")
    fireEvent.change(input, { target: { value: "react" } })

    const button = screen.getByRole("button", { name: /search/i })
    fireEvent.click(button)

    expect(mockPush).toHaveBeenCalledWith("/search?q=react")
  })
})

