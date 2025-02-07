import { searchRepositories, getRepository } from "./github"
import { jest } from "@jest/globals"

global.fetch = jest.fn()

describe("GitHub API functions", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe("searchRepositories", () => {
    it("should fetch repositories successfully", async () => {
      const mockResponse = {
        total_count: 1,
        items: [{ id: 1, name: "test-repo" }],
      }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await searchRepositories("test", 1)
      expect(result).toEqual(mockResponse)
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.github.com/search/repositories?q=test&page=1",
        expect.any(Object),
      )
    })

    it("should throw an error when fetch fails", async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      })

      await expect(searchRepositories("test", 1)).rejects.toThrow("Failed to fetch repositories")
    })
  })

  describe("getRepository", () => {
    it("should fetch repository details successfully", async () => {
      const mockResponse = { id: 1, name: "test-repo", owner: { login: "test-user" } }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await getRepository("test-user", "test-repo")
      expect(result).toEqual(mockResponse)
      expect(global.fetch).toHaveBeenCalledWith("https://api.github.com/repos/test-user/test-repo", expect.any(Object))
    })

    it("should throw an error when fetch fails", async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      })

      await expect(getRepository("test-user", "test-repo")).rejects.toThrow("Failed to fetch repository details")
    })
  })
})

