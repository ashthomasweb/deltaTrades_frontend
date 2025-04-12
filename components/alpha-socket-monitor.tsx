import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import Candlestick from './candlestick';

export const AlphaSocketMonitor: React.FC = () => {
  const { isConnected, messages } = useWebSocket('ws://localhost:8080');

  return (
    <div className="">
      <h2>Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}</h2>
      <div>
        {/* <h3>Messages:</h3> */}
        {/* <ul>
          {messages.map((msg, idx) => (
            <li key={idx}>
              <pre>{JSON.stringify(msg, null, 2)}</pre>
            </li>
          ))}
        </ul> */}
          <Candlestick messages={messages} />
      </div>
    </div>
  );
};
