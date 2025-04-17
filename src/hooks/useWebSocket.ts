// src/hooks/useWebSocket.ts
import { useEffect, useRef, useState } from 'react'
import DisplayService from '../services/display.service'
import { RequestParams } from '../components/alpha-socket-monitor/alpha-socket-monitor'

export const useWebSocket = (url: string, requestParams: RequestParams | null) => {
  const socket = useRef<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState<any[]>([])

  useEffect(() => {
    socket.current = new WebSocket(url)

    socket.current.onopen = () => {
      setIsConnected(true)
      console.log('WebSocket connected')
     
    }

    socket.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        setMessages((prev) => [...prev, data])
        DisplayService.setHistorical(messages, data)
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
      setTimeout(() => {
        socket.current?.send(
          JSON.stringify({
            type: 'getHistorical',
            symbol: requestParams.symbol,
          }),
        )
      }, 500)
    }
  }, [requestParams?.symbol])

  return { isConnected, messages }
}
