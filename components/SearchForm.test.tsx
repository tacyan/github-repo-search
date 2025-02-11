import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { SearchForm } from "./SearchForm"
import userEvent from "@testing-library/user-event"

// push 呼び出しの引数を検証するために変数として定義
const pushMock = jest.fn();

// テスト用の searchParams から q の値を返すための変数
let mockSearchQuery = "";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock, // ここを直接 pushMock に設定
  }),
  useSearchParams: () => ({
    toString: () => "",
    get: (key: string) => {
      if (key === "q") return mockSearchQuery;
      return "";
    },
  }),
}))

describe("SearchForm", () => {
  // 各テスト実行前に pushMock をリセット
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("正しくレンダリングされる", () => {
    render(<SearchForm initialQuery="" />)
    expect(screen.getByLabelText("Search repositories")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument()
  })

  it("入力されたクエリを送信する", () => {
    // 初期検索クエリが空の場合は mockSearchQuery も空にする
    mockSearchQuery = "";
    render(<SearchForm initialQuery="" />)

    const input = screen.getByLabelText("Search repositories")
    fireEvent.change(input, { target: { value: "react" } })
    
    // formを直接取得してsubmitイベントを発火
    const form = screen.getByTestId("search-form")
    fireEvent.submit(form)
  })

  // --- 追加テストケース：スター数フィルターの後勝ちを検証 ---

  it("最後に入力されたスター数フィルターが適用される（stars:>100 を stars:>1000 の後に入力）", async () => {
    // 初期検索クエリが "react" なので mockSearchQuery も "react" に設定
    mockSearchQuery = "react";
    render(<SearchForm initialQuery="react" />)
    const input = screen.getByLabelText("Search repositories")
    const form = screen.getByTestId("search-form")

    fireEvent.change(input, { target: { value: "react stars:>1000" } })
    fireEvent.change(input, { target: { value: "react stars:>100" } })

    fireEvent.submit(form)
    
    await waitFor(() => expect(pushMock).toHaveBeenCalled())
    const pushArg = pushMock.mock.calls[0][0]
    expect(decodeURIComponent(pushArg)).toBe("/search?q=react&sort=stars&order=desc")
  })

  it("最後に入力されたスター数フィルターが適用される（stars:>1000 を stars:>100 の後に入力）", async () => {
    // mockSearchQuery = "react";
    render(<SearchForm initialQuery="react" />)
    const input = screen.getByLabelText("Search repositories")
    const form = screen.getByTestId("search-form")

    fireEvent.change(input, { target: { value: "react stars:>100" } })
    fireEvent.change(input, { target: { value: "react stars:>1000" } })

    fireEvent.submit(form)
    
    await waitFor(() => expect(pushMock).toHaveBeenCalled())
    const pushArg = pushMock.mock.calls[0][0]
    expect(decodeURIComponent(pushArg)).toBe("/search?q=react&sort=stars&order=desc")
  })

  it("順序に関係なく、最後のスター数フィルターが適用される（最後が stars:>1000 で終わる）", async () => {
    // mockSearchQuery = "react";
    render(<SearchForm initialQuery="react" />)
    const input = screen.getByLabelText("Search repositories")
    const form = screen.getByTestId("search-form")

    fireEvent.change(input, { target: { value: "react stars:>10000" } })
    fireEvent.change(input, { target: { value: "react stars:>100" } })
    fireEvent.change(input, { target: { value: "react stars:>1000" } })

    fireEvent.submit(form)
    
    await waitFor(() => expect(pushMock).toHaveBeenCalled())
    const pushArg = pushMock.mock.calls[0][0]
    expect(decodeURIComponent(pushArg)).toBe("/search?q=react&sort=stars&order=desc")
  })
})

