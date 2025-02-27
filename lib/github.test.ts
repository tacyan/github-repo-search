import { searchRepositories, getRepository } from "./github"
import { jest } from "@jest/globals"

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
})

const mockFetch = jest.fn() as unknown as jest.MockedFunction<typeof fetch>
global.fetch = mockFetch

describe("GitHub API functions", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe("searchRepositories", () => {
    it("リポジトリを正常に取得できる", async () => {
      const mockResponse = {
        total_count: 1,
        items: [{ id: 1, name: "test-repo" }],
      }
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await searchRepositories("test", 1)
      expect(result).toEqual(mockResponse)
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.github.com/search/repositories?q=test&page=1",
        expect.any(Object),
      )
    })

    it("フェッチに失敗した場合、エラーをスローする", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      } as Response)

      await expect(searchRepositories("test", 1)).rejects.toThrow("Failed to fetch repositories")
    })
  })

  describe("getRepository", () => {
    it("リポジトリの詳細情報を正常に取得できる", async () => {
      const mockResponse = { id: 1, name: "test-repo", owner: { login: "test-user" } }
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await getRepository("test-user", "test-repo")
      expect(result).toEqual(mockResponse)
      expect(global.fetch).toHaveBeenCalledWith("https://api.github.com/repos/test-user/test-repo", expect.any(Object))
    })

    it("フェッチに失敗した場合、エラーをスローする", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      } as Response)

      await expect(getRepository("test-user", "test-repo")).rejects.toThrow("Failed to fetch repository details")
    })
  })
})

