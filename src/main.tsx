// import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { App } from './App.tsx'
import MainProvider from '@context/MainContext.tsx'
import '@styles/main.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App path="/" />,
  },
  {
    path: '/historic',
    element: <App path="/historic" />,
  },
  {
    path: '/realTime',
    element: <App path="/realTime" />,
  },
  {
    path: '/analysis',
    element: <App path="/analysis" />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <MainProvider>
    <RouterProvider router={router} />
  </MainProvider>,
  // </React.StrictMode>,
)
