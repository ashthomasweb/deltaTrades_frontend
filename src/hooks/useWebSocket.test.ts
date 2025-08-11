import { renderHook, waitFor } from '@testing-library/react'
import { act } from 'react'
import { useWebSocket } from './useWebSocket'
import { vi } from 'vitest'
import { RequestParams } from '../types/types'

class MockWebSocket {
  static latest: MockWebSocket
  static CONNECTING = 0
  static OPEN = 1
  static CLOSING = 2
  static CLOSED = 3
  public readyState = 0
  public onopen: ((ev: Event) => void) | null = null
  public onmessage: ((ev: MessageEvent) => void) | null = null
  public onclose: (() => void) | null = null
  public onerror: ((ev: Event) => void) | null = null
  public send = vi.fn()
  public close = vi.fn()

  constructor() {
    MockWebSocket.latest = this
  }
}

describe('useWebSocket', () => {
  let socket: MockWebSocket

  beforeAll(() => {
    vi.stubGlobal('WebSocket', MockWebSocket as unknown as typeof WebSocket)

    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  beforeEach(() => {
    MockWebSocket.latest = undefined as unknown as MockWebSocket
    vi.clearAllMocks()
  })

  it('should return expected structure', () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost:1234', { type: undefined }, 'test'))

    expect(result.current).toMatchObject({
      isConnected: false,
      messages: [],
      socketControls: expect.objectContaining({
        connect: expect.any(Function),
        disconnect: expect.any(Function),
      }),
    })
  })

  it('should set isConnected to true when socket opens', async () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost:1234', { type: undefined }, 'test'))
    socket = MockWebSocket.latest

    act(() => {
      socket.readyState = MockWebSocket.OPEN
      socket.onopen?.(new Event('open'))
    })

    await waitFor(() => {
      expect(result.current.isConnected).toBe(true)
    })
  })

  it('should update local message state after onMessage event', async () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost:1234', { type: undefined }, 'test'))

    socket = MockWebSocket.latest

    const mockMessage1 = {
      type: 'test-data',
      payload: { foo: 'bar' },
    }

    const mockMessage2 = {
      type: 'test-data',
      payload: { foo: 'you' },
    }

    act(() => {
      socket.onmessage?.({
        data: JSON.stringify(mockMessage1),
      } as MessageEvent)
    })

    await waitFor(() => {
      expect(result.current.messages).toContainEqual(mockMessage1)
    })

    act(() => {
      socket.onmessage?.({
        data: JSON.stringify(mockMessage2),
      } as MessageEvent)
    })

    await waitFor(() => {
      expect(result.current.messages).toEqual([mockMessage1, mockMessage2])
    })
  })

  it('should log an error on malformed message', async () => {
    renderHook(() => useWebSocket('ws://localhost:1234', { type: undefined }, 'test'))

    socket = MockWebSocket.latest

    const malformedMessage = "{} type: 'test', payload: { trailingComma: true }, }"

    act(() => {
      socket.onmessage?.({
        data: malformedMessage,
      } as MessageEvent)
    })

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('WebSocket message parse error', expect.any(SyntaxError))
    })
  })

  it('should update state when disconnect is called', async () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost:1234', { type: undefined }, 'test'))

    socket = MockWebSocket.latest

    act(() => {
      socket.readyState = MockWebSocket.OPEN
      socket.onopen?.(new Event('open'))
    })

    await waitFor(() => {
      expect(result.current.isConnected).toBe(true)
    })

    act(() => {
      result.current.socketControls.disconnect()
      socket.onclose?.()
    })

    await waitFor(() => {
      expect(socket.close).toHaveBeenCalled()
      expect(result.current.isConnected).toBe(false)
    })
  })

  it('should call .close() when component unmounts', async () => {
    const { unmount } = renderHook(() => useWebSocket('ws://localhost:1234', { type: undefined }, 'test'))

    socket = MockWebSocket.latest

    act(() => {
      unmount()
    })

    await waitFor(() => {
      expect(socket.close).toHaveBeenCalled()
    })
  })

  it('should establish a new WebSocket connection when connect is called', async () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost:1234', { type: undefined }, 'test'))

    const firstSocket = MockWebSocket.latest

    act(() => {
      firstSocket.readyState = MockWebSocket.OPEN
      firstSocket.onopen?.(new Event('open'))
    })

    await waitFor(() => {
      expect(result.current.isConnected).toBe(true)
    })

    act(() => {
      result.current.socketControls.connect()
    })

    const secondSocket = MockWebSocket.latest

    act(() => {
      secondSocket.readyState = MockWebSocket.OPEN
      secondSocket.onopen?.(new Event('open'))
    })

    await waitFor(() => {
      expect(result.current.isConnected).toBe(true)
    })

    expect(firstSocket.close).toHaveBeenCalled()
  })

  it('should send request packet only when socket is open', async () => {
    const initialParams: Partial<RequestParams> = { type: undefined }
    const mockParams: Partial<RequestParams> = {
      type: 'historical',
      requestOriginator: 'frontend',
      returnToFE: true,
    }

    const { result, rerender } = renderHook(({ params }) => useWebSocket('ws://localhost:1234', params, 'test'), {
      initialProps: { params: initialParams as Partial<RequestParams> },
    })

    socket = MockWebSocket.latest

    act(() => {
      socket.readyState = WebSocket.OPEN
      socket.onopen?.(new Event('open'))
    })

    await waitFor(() => {
      expect(result.current.isConnected).toBe(true)
    })

    rerender({ params: mockParams })

    await waitFor(() => {
      expect(result.current.isConnected).toBe(true)
    })

    await waitFor(() => {
      expect(socket.send).toHaveBeenCalledTimes(1)

      const sentPacket = JSON.parse(socket.send.mock.calls[0][0])
      expect(sentPacket).toMatchObject(mockParams)
    })
  })

  it('should log message for user when socket fails to connect', () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost:1234', { type: undefined }, 'test'))

    socket = MockWebSocket.latest

    act(() => {
      socket.onerror?.(new Event('error'))
    })

    waitFor(() => {
      expect(result.current.isConnected).toBe(false)
      expect(console.error).toHaveBeenCalledWith(
        'Failed to connect to WebSocket. Is the server even running Champ?\n\nContact your friendly neighborhood developer for a better error handling system!',
        expect.any(SyntaxError),
      )
    })
  })

  it('should NOT call send if requestParam type is undefined', () => {
    renderHook(() => useWebSocket('ws://localhost:1234', { type: undefined }, 'test'))

    expect(socket.send).not.toHaveBeenCalled()
  })

  it('should NOT call send if socket is never opened', () => {
    renderHook(() => useWebSocket('ws://localhost:1234', { type: 'historical' }, 'test'))

    expect(MockWebSocket.latest.send).not.toHaveBeenCalled()
  })

  it('should NOT call send if socket is not open', () => {
    const { rerender } = renderHook(({ params }) => useWebSocket('ws://localhost:1234', params, 'test'), {
      initialProps: { params: { type: undefined } },
    })

    socket = MockWebSocket.latest
    socket.readyState = WebSocket.CONNECTING

    const initialParams = {
      type: undefined,
    }

    rerender({ params: initialParams })

    expect(socket.send).not.toHaveBeenCalled()
  })
})
