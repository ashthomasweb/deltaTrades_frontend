import { ContentView } from './layout/content/content'
import { HeaderView } from './layout/header/header'
import { AlphaSocketMonitor } from './components/alpha-socket-monitor/alpha-socket-monitor'
import { TradierSocketMonitor } from './components/tradier-socket-monitor/tradier-socket-monitor.tsx'

export function App(props: { path: string }) {
  return (
    <>
      <HeaderView />
      <ContentView>
        {props.path === '/' ? <p>Hello Delta!</p> : null}
        {props.path === '/historic' ? <AlphaSocketMonitor /> : null}
        {props.path === '/real-time' ? <TradierSocketMonitor /> : null}
        {props.path === '/analysis' ? <p>A place for research.</p> : null}
      </ContentView>
    </>
  )
}
