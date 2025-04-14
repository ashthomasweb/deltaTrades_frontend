import './App.css'
import { ContentView } from './views/content/content'
import { HeaderView } from './views/header/header'
import { AlphaSocketMonitor } from './components/alpha-socket-monitor/alpha-socket-monitor'
import { TradierSocketMonitor } from './components/tradier-socket-monitor/tradier-socket-monitor.tsx'

export function App(props: { path: string }) {
  return (
    <div className='app-container'>
      <HeaderView />
      <ContentView>
        {props.path === '/' ? <p>Hello Delta!</p> : null}
        {props.path === '/historic' ? <AlphaSocketMonitor /> : null}
        {props.path === '/real-time' ? <TradierSocketMonitor /> : null}
        {props.path === '/analysis' ? <p>A place for research.</p> : null}
      </ContentView>
    </div>
  )
}
