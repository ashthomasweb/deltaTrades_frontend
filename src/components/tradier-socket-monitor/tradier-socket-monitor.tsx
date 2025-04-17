import { useContext } from 'react'
import { useWebSocket } from '../../hooks/useWebSocket'
import { MainContext } from '../../_context/MainContext'
import './tradier-socket-monitor.scss'

export const TradierSocketMonitor = () => {
  // const {
  //   mainState: {  },
  // } = useContext(MainContext)

  const { isConnected, messages } = useWebSocket('ws://localhost:8080')

  return (
    <div className="real-time-container">
      <h1>Real-Time Data</h1>
      <h2>Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}</h2>
      <div>
        <h3>Messages: (WIP Temp values)</h3>
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
