import React from 'react'
import { useWebSocket } from '../../hooks/useWebSocket'
import Candlestick from '../candlestick/candlestick'

export const AlphaSocketMonitor: React.FC = () => {
  const { isConnected, messages } = useWebSocket('ws://localhost:8080')

  return (
    <div className="">
      <h1>Historical Data</h1>
      <h2>Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}</h2>
      <div>
        <Candlestick messages={messages} />
      </div>
    </div>
  )
}
