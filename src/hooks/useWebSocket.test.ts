import { vi } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { useWebSocket } from "./useWebSocket"

describe("useWebSocket", () => {
  beforeAll(() => {
    vi.spyOn(global, "WebSocket").mockImplementation(vi.fn())
  })

  const { result } = renderHook(() => {
    useWebSocket("ws://localhost:8080")
  })

  it("should return an object with a isConnected value", () => {
    waitFor(() => expect(result.current).toHaveProperty("isConnected"))
  })

  it("should return an object with a messages value", () => {
    waitFor(() => expect(result.current).toHaveProperty("messages"))
  })
})
