import { ContentView } from './layout/content/content'
import { HeaderView } from './layout/header/header'
import { AlphaSocketMonitor } from './components/socket-types/alpha-socket-monitor/alpha-socket-monitor.tsx'
import { TradierSocketMonitor } from './components/socket-types/tradier-socket-monitor/tradier-socket-monitor.tsx'
import { AnalysisSocketMonitor } from './components/socket-types/analysis-socket-monitor/analysis-socket-monitor.tsx'

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
        {path === '/realTime' ? <TradierSocketMonitor /> : null}
        {path === '/analysis' ? <AnalysisSocketMonitor /> : null}
      </ContentView>
    </>
  )
}
