import { render, screen } from '@testing-library/react'
import { AlphaSocketMonitor } from './alpha-socket-monitor.tsx'

test('Renders Header', () => {
  render(<AlphaSocketMonitor />)
  const headerElement = screen.getByText(/Historical Data/i)
  expect(headerElement).toBeInTheDocument()
})
