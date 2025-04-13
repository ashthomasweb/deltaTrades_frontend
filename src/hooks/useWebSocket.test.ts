import { vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useWebSocket } from './useWebSocket'

describe('useWebSocket', () => {
  const webSockerURL = 'ws://localhost:8080'
  const MockWebSocket = vi.fn()
  let hook: ReturnType<typeof renderHook>

  beforeAll(() => {
    MockWebSocket.prototype.close = vi.fn()
    Object.defineProperty(global, 'WebSocket', {
      value: MockWebSocket,
      writable: true,
    })
    hook = renderHook(() => {
      useWebSocket(webSockerURL)
    })
  })

  it('should return an object with a isConnected value', () => {
    waitFor(() => expect(hook.result.current).toHaveProperty('isConnected'))
  })

  it('should return an object with a messages value', () => {
    waitFor(() => expect(hook.result.current).toHaveProperty('messages'))
  })

  it('should instantiate a new WebSocket', () => {
    expect(MockWebSocket).toHaveBeenCalledWith(webSockerURL)
  })

  it('should close the WebSocket connection when the component unmounts', () => {
    hook.unmount()
    expect(MockWebSocket.prototype.close).toHaveBeenCalled()
  })
})
