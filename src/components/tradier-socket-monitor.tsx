import React, { useContext } from 'react'
import { useWebSocket } from '../hooks/useWebSocket'
import { MainContext } from '../_context/MainContext'

export const TradierSocketMonitor: React.FC = () => {
  const {
    mainState: {},
  } = useContext(MainContext)
  const { isConnected, messages } = useWebSocket('ws://localhost:8080')

  return (
    <div className="">
      <h2>Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}</h2>
      <div>
        <h3>Messages:</h3>
        <ul>
          {messages.map((msg, idx) => (
            <li key={idx}>
              <pre>{JSON.stringify(msg, null, 2)}</pre>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
