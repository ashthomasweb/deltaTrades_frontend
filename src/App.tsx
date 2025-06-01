import { ContentView } from './layout/content/content'
import { HeaderView } from './layout/header/header'
import { AlphaSocketMonitor } from './components/alpha-socket-monitor/alpha-socket-monitor'
import { TradierSocketMonitor } from './components/tradier-socket-monitor/tradier-socket-monitor.tsx'
import { AnalysisSocketMonitor } from './components/analysis-socket-monitor/analysis-socket-monitor.tsx'

interface AppProps {
  path: string
}

export function App({ path }: AppProps) {
  return (
    <>
      <HeaderView />
      <ContentView>
        {path === '/' ? <p>Hello Delta!</p> : null}
        {path === '/historic' ? <AlphaSocketMonitor /> : null}
        {path === '/real-time' ? <TradierSocketMonitor /> : null}
        {path === '/analysis' ? <AnalysisSocketMonitor /> : null}
      </ContentView>
    </>
  )
}
