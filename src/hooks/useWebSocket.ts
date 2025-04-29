import { useContext, useEffect, useRef, useState, useCallback } from 'react'
import { RequestParams } from '../types/types'
import { MainContext } from '../_context/MainContext'
import DisplayService from '../services/display.service'

export const useWebSocket = (url: string, requestParams: Partial<RequestParams> | null, connectionType: string) => {
  const {
    mainState: { realTimeConnectionStatus, historicalConnectionStatus },
  } = useContext(MainContext)

  const socket = useRef<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState<any[]>([])

  const connect = useCallback(() => {
    if (socket.current) {
      console.warn('WebSocket already exists. Disconnecting old one first.')
      socket.current.close()
    }

    socket.current = new WebSocket(url)

    socket.current.onopen = () => {
      setIsConnected(true)
      console.log('WebSocket connected')
      DisplayService.handleConnectionStatus(connectionType, { connected: true })
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
      DisplayService.handleConnectionStatus(connectionType, { connected: false })
    }

    socket.current.onerror = event => {
      console.error('WebSocket error:', event)
      // NEW: You can set a dedicated error state here:
      alert(
        'Failed to connect to WebSocket. Is the server running?\n\nContact your local developer for a better error handling system!',
      )
    }
  }, [url, connectionType])

  const disconnect = useCallback(() => {
    if (socket.current) {
      console.log('Closing WebSocket')
      socket.current.close()
      socket.current = null
    }
  }, [])

  const sendRequestParams = useCallback(() => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN && requestParams) {
      console.log('Sending request params over WebSocket')
      socket.current.send(
        JSON.stringify({
          type: requestParams.type,
          symbol: requestParams.symbol,
          month: requestParams.month,
          interval: requestParams.interval,
          savedData: requestParams.savedData,
          storeData: requestParams.storeData,
          backfill: requestParams.backfill,
          dataSize: requestParams.dataSize,
          algorithm: requestParams.algorithm,
          sendToQueue: requestParams.sendToQueue,
          enableTrading: requestParams.enableTrading,
          getPrevious: requestParams.getPrevious,
          beginDate: requestParams.beginDate,
        }),
      )
    }
  }, [requestParams])

  // Automatically connect on mount
  useEffect(() => {
    connect()

    return () => {
      disconnect()
    }
  }, [connect, disconnect])

  // Send params when they change and connection is open
  useEffect(() => {
    if (isConnected && requestParams) {
      sendRequestParams()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestParams])

  const socketControls = {
    connect,
    disconnect,
  }

  return { isConnected, messages, socketControls }
}
