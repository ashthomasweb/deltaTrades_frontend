// src/hooks/useWebSocket.ts
import { useEffect, useRef, useState } from 'react'
import { RequestParams } from '../types/types'

export const useWebSocket = (url: string, requestParams: Partial<RequestParams> | null) => {
  const socket = useRef<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState<any[]>([])

  useEffect(() => {
    socket.current = new WebSocket(url)

    socket.current.onopen = () => {
      setIsConnected(true)
      console.log('WebSocket connected')
    }

    socket.current.onmessage = event => {
      console.log('***\n%cTRACE: socket onMessage', 'color: green; font-weight: 900')
      try {
        const data = JSON.parse(event.data)
        console.log('received message:', data)
        setMessages(prev => [...prev, data])
      } catch (err) {
        console.error('WebSocket message parse error', err)
      }
    }

    socket.current.onclose = () => {
      setIsConnected(false)
      console.log('WebSocket disconnected')
    }

    return () => {
      socket.current?.close()
    }
  }, [url])

  useEffect(() => {
    if (requestParams && requestParams?.symbol) {
      socket.current?.send(
        JSON.stringify({
          type: requestParams.type,
          symbol: requestParams.symbol,
          interval: requestParams.interval,
          beginDate: requestParams.beginDate,
          endDate: requestParams.endDate,
          savedData: requestParams.savedData,
          isCompact: requestParams.isCompact,
        }),
      )
    }
  }, [requestParams])

  return { isConnected, messages }
}
