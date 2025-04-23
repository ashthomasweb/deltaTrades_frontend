// src/hooks/useWebSocket.test.ts
import DisplayService from '../services/display.service'
import { useWebSocket } from './useWebSocket'
import { vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'

describe('useWebSocket', () => {
  let render: ReturnType<typeof renderHook>
  let hook: ReturnType<typeof useWebSocket>
  let socket: WebSocket

  const webSockerURL = 'ws://localhost:8080'
  const socketSendPacket = { type: 'getHistorical', symbol: 'TSLA' }
  const socketReceivePacket = {
    type: 'historical',
    symbol: 'TSLA',
    data: [
      { date: '2023-01-01', open: 100, close: 110 },
      { date: '2023-01-02', open: 110, close: 120 },
    ],
  }

  beforeAll(() => {
    vi.stubGlobal(
      'WebSocket',
      class extends WebSocket {
        constructor(...args: ConstructorParameters<typeof WebSocket>) {
          super(...args)
          const thisSocket = this as WebSocket
          socket = thisSocket
          vi.spyOn(thisSocket, 'send')
          vi.spyOn(thisSocket, 'close')
        }
      },
    )
    vi.spyOn(DisplayService, 'setHistorical').mockImplementation(vi.fn())
    vi.spyOn(console, 'error').mockImplementation(vi.fn())
    vi.spyOn(console, 'log').mockImplementation(vi.fn())

    render = renderHook(() => useWebSocket(webSockerURL))
    hook = render.result.current as ReturnType<typeof useWebSocket>
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('should return an object with a isConnected value', () => {
    waitFor(() => expect(hook).toHaveProperty('isConnected'))
  })

  it('should return an object with a messages value', () => {
    waitFor(() => expect(hook).toHaveProperty('messages'))
  })

  it('should fetch messages on WebSocket open', () => {
    waitFor(() => expect(socket.send).toHaveBeenCalledWith(JSON.stringify(socketSendPacket)))
  })

  it("should log 'WebSocket connected' on open", () => {
    waitFor(() => expect(console.log).toHaveBeenCalledWith('WebSocket connected'))
  })

  it('should set the isConnected state to true on WebSocket open', () => {
    waitFor(() => expect(hook.isConnected).toBe(true))
  })

  it('should set the historical data when a message is received', () => {
    socket.onmessage?.({
      data: JSON.stringify(socketReceivePacket),
    } as MessageEvent)

    waitFor(() => expect(DisplayService.setHistorical).toHaveBeenCalledWith(hook.messages, socketReceivePacket.data))
    waitFor(() => expect(hook.messages).toEqual([socketReceivePacket]))
  })

  it('should handle errors from bad messages', () => {
    const badMessage = 'foobar'
    socket.onmessage?.({ data: badMessage } as MessageEvent)

    expect(console.error).toHaveBeenCalledWith('WebSocket message parse error', expect.any(SyntaxError))
  })

  it('should close the WebSocket connection when the component unmounts', () => {
    render.unmount()

    expect(socket.close).toHaveBeenCalled()
    waitFor(() => expect(console.log).toHaveBeenCalledWith('WebSocket disconnected'))
    waitFor(() => expect(hook.isConnected).toBe(false))
  })
})
