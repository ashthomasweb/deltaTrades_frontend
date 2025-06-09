import { render, screen } from '@testing-library/react'
import { AnalysisSocketMonitor } from './analysis-socket-monitor.tsx'

test('Renders Header', () => {
  render(<AnalysisSocketMonitor />)
  const headerElement = screen.getByText(/Analysis/i)
  expect(headerElement).toBeInTheDocument()
})
