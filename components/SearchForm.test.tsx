import { render, screen, fireEvent, waitFor, within } from "@testing-library/react"
import "@testing-library/jest-dom"
import { SearchForm } from "./SearchForm"
import userEvent from "@testing-library/user-event"

// push 呼び出しの引数を検証するために変数として定義
const pushMock = jest.fn();

// テスト用の searchParams から q の値を返すための変数
let mockSearchQuery = "";

const stableSearchParams = {
  toString: () => "",
  get: (key: string) => {
    if (key === "q") return mockSearchQuery;
    return "";
  },
};

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => stableSearchParams,
}));

// --- 追加: 候補キーワード取得フックのモック ---
// SearchFormコンポーネントが内部で利用するためのフックをバーチャルモジュールとしてモックします。
jest.mock('../hooks/useSearchSuggestions', () => ({
  useSearchSuggestions: () => ([
    { keyword: "redux", stars: 8000 },
    { keyword: "react", stars: 9000 },
    { keyword: "reason", stars: 5000 },
    { keyword: "recoil", stars: 3000 },
    { keyword: "relay", stars: 2000 },
    { keyword: "rm", stars: 10000 },
    { keyword: "r", stars: 20000 },
  ])
}), { virtual: true });

// --- 追加: global.fetch のモックをテスト用に設定 ---
beforeAll(() => {
  global.fetch = jest.fn((url: RequestInfo) => {
    // GitHub API でのリポジトリ検索の場合（SearchForm で getSearchSuggestions が利用される）
    if (typeof url === "string" && url.startsWith("https://api.github.com/search/repositories")) {
      return Promise.resolve({
        ok: true,
        json: async () => ({
          items: [
            { name: "redux", stars: 8000 },
            { name: "react", stars: 9000 },
            { name: "reason", stars: 5000 },
            { name: "recoil", stars: 3000 },
            { name: "relay", stars: 2000 },
            { name: "rm", stars: 10000 },
            { name: "r", stars: 20000 },
          ],
        }),
      });
    }

    // その他（fetchSuggestions などで利用される場合）
    return Promise.resolve({
      ok: true,
      json: async () => ([
        { keyword: "redux", stars: 8000 },
        { keyword: "react", stars: 9000 },
        { keyword: "reason", stars: 5000 },
        { keyword: "recoil", stars: 3000 },
        { keyword: "relay", stars: 2000 },
        { keyword: "rm", stars: 10000 },
        { keyword: "r", stars: 20000 },
      ]),
    });
  }) as jest.Mock;
});

afterAll(() => {
  // global.fetch のモックを除去
  (global.fetch as jest.Mock).mockRestore();
});

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
    expect(decodeURIComponent(pushArg)).toBe("/search?q=react stars:>100&sort=stars&order=desc")
  })

  it("最後に入力されたスター数フィルターが適用される（stars:>1000 を stars:>100 の後に入力）", async () => {
    // 初期検索クエリが "react" なので mockSearchQuery も "react" に設定
    render(<SearchForm initialQuery="react" />)
    const input = screen.getByLabelText("Search repositories")
    const form = screen.getByTestId("search-form")

    fireEvent.change(input, { target: { value: "react stars:>100" } })
    fireEvent.change(input, { target: { value: "react stars:>1000" } })

    fireEvent.submit(form)
    
    await waitFor(() => expect(pushMock).toHaveBeenCalled())
    const pushArg = pushMock.mock.calls[0][0]
    expect(decodeURIComponent(pushArg)).toBe("/search?q=react stars:>1000&sort=stars&order=desc")
  })

  it("順序に関係なく、最後のスター数フィルターが適用される（最後が stars:>1000 で終わる）", async () => {
    // 初期検索クエリが "react" なので mockSearchQuery も "react" に設定
    render(<SearchForm initialQuery="react" />)
    const input = screen.getByLabelText("Search repositories")
    const form = screen.getByTestId("search-form")

    fireEvent.change(input, { target: { value: "react stars:>10000" } })
    fireEvent.change(input, { target: { value: "react stars:>100" } })
    fireEvent.change(input, { target: { value: "react stars:>1000" } })

    fireEvent.submit(form)
    
    await waitFor(() => expect(pushMock).toHaveBeenCalled())
    const pushArg = pushMock.mock.calls[0][0]
    expect(decodeURIComponent(pushArg)).toBe("/search?q=react stars:>1000&sort=stars&order=desc")
  })

  // --- 追加テストケース: 候補キーワードの表示検証 ---
  it("2文字以上の入力の場合、候補キーワードをスター数が多い順に最大5つ表示する", async () => {
    mockSearchQuery = "";
    render(<SearchForm initialQuery="" />);
  
    // 検索入力フィールドを取得し、2文字以上の入力をシミュレートする
    const input = screen.getByLabelText("Search repositories");
    // 入力フィールドにフォーカスして、値を変更することで内部状態を更新
    await userEvent.type(input, "re");
    await waitFor(() => expect(input).toHaveValue("re"));

    // 入力後、候補一覧がレンダリングされるのを待機し、コンテナ内の <button> 要素が5件になるのを確認する
    await waitFor(() => {
      const container = document.querySelector<HTMLElement>("div.absolute.z-10");
      expect(container).not.toBeNull();
      const items = within(container!).getAllByRole("button");
      expect(items.length).toBe(5);
    });
    
    // 取得した候補アイテムに対して更なる検証を実施
    const suggestionContainer = document.querySelector<HTMLElement>("div.absolute.z-10");
    const suggestionItems = within(suggestionContainer!).getAllByRole("button");

    // 各候補は「keyword (stars)」の形式で表示されていると想定し、スター数の降順になっているか検証
    const starCounts = suggestionItems.map((item) => {
      const text = item.textContent || "";
      const match = text.match(/\((\d+)\)$/);
      return match ? parseInt(match[1], 10) : 0;
    });
    for (let i = 0; i < starCounts.length - 1; i++) {
      expect(starCounts[i]).toBeGreaterThanOrEqual(starCounts[i + 1]);
    }

    // 各候補のキーワード部分が2文字以上であることを確認
    suggestionItems.forEach((item) => {
      const text = item.textContent || "";
      // "keyword (stars)" の "(stars)" 部分を除去してキーワード部分を取得
      const keyword = text.replace(/\s*\(\d+\)$/, "");
      expect(keyword.length).toBeGreaterThanOrEqual(2);
    });
  });
})

