import { useEffect, useRef, useState, useCallback } from 'react'
import { MessageType, RequestParams } from '@dt-types'
import DisplayService from '@services/display.service'
import { request } from 'express'

export const useWebSocket = (url: string, requestParams: Partial<RequestParams>, connectionType: string) => {
  const socket = useRef<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState<Partial<MessageType>[]>([])
  const chartIdRef = useRef<unknown>(requestParams?.chartId)

  useEffect(() => {
    chartIdRef.current = requestParams?.chartId
  }, [requestParams?.chartId])

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
      try {
        const data = JSON.parse(event.data)
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
      alert(
        'Failed to connect to WebSocket. Is the server even running Champ?\n\nContact your friendly neighborhood developer for a better error handling system!',
      )
    }
  }, [url, connectionType])

  const disconnect = useCallback(() => {
    if (socket.current) {
      console.log('Closing WebSocket')
      socket.current.send(
        JSON.stringify({
          requestType: 'closeRequest',
          chartId: chartIdRef.current,
        }),
      )
      socket.current.close()
      socket.current = null
    }
  }, [])

  const sendRequestParams = useCallback(() => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN && requestParams) {
      requestParams.requestOriginator = 'frontend'
      requestParams.returnToFE = true
      socket.current.send(JSON.stringify(requestParams))
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
