import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { AnalysisSocketMonitor } from './analysis-socket-monitor'

// 🧪 Mock useWebSocket to prevent real connections
class MockWebSocket {
  static CONNECTING = 0
  static OPEN = 1
  static CLOSING = 2
  static CLOSED = 3
  readyState = MockWebSocket.OPEN
  onopen = vi.fn()
  onmessage = vi.fn()
  onclose = vi.fn()
  onerror = vi.fn()
  send = vi.fn()
  close = vi.fn()
}

// Fully stub WebSocket globally
vi.stubGlobal('WebSocket', MockWebSocket)

// 🧪 Mock Candlestick to test headingData flow
vi.mock('../../candlestick/candlestick.component.tsx', () => ({
  Candlestick: ({ headingData }: any) => <div data-testid="candlestick-mock">{headingData.title}</div>,
}))

describe('AnalysisSocketMonitor', () => {
  it('renders the candlestick heading', async () => {
    render(<AnalysisSocketMonitor />)

    const headerElem = await screen.findByTestId('candlestick-mock')
    expect(headerElem).toHaveTextContent(/Analysis/i)

    const chartStub = screen.getByTestId('candlestick-mock')
    expect(chartStub).toBeInTheDocument()
  })
})
