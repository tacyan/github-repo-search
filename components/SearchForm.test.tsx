import { render, screen, fireEvent } from "@testing-library/react"
import { SearchForm } from "./SearchForm"

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    toString: () => "",
    get: () => "",
  }),
}))

describe("SearchForm", () => {
  it("renders correctly", () => {
    render(<SearchForm initialQuery="" />)
    expect(screen.getByRole("searchbox")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument()
  })

  it("submits the form with the entered query", () => {
    render(<SearchForm initialQuery="" />)

    const input = screen.getByRole("searchbox")
    fireEvent.change(input, { target: { value: "react" } })
    
    // formを直接取得してsubmitイベントを発火
    const form = screen.getByTestId("search-form")
    fireEvent.submit(form)
  })
})

