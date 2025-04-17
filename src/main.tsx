import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './_styles/main.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainProvider from './_context/MainContext.tsx'

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
    path: '/real-time',
    element: <App path="/real-time" />,
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
    </MainProvider>
  // </React.StrictMode>,
)
