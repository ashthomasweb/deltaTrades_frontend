import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App.tsx"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { HelloWorld } from "./HelloWorld.tsx"
import { AlphaSocketMonitor } from "./components/alpha-socket-monitor.tsx"
import { TradierSocketMonitor } from "./components/tradier-socket-monitor.tsx"
import Candlestick from "./components/candlestick.tsx"
import MainProvider from "./_context/MainContext.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/hello-world",
    element: <HelloWorld />,
  },
  {
    path: "/historic",
    element: <AlphaSocketMonitor />,
  },
  {
    path: "/real-time",
    element: <TradierSocketMonitor />,
  },
  // {
  // 	path: "/candlestick",
  // 	element: <Candlestick />,
  // },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MainProvider>
      <RouterProvider router={router} />
    </MainProvider>
  </React.StrictMode>,
)
