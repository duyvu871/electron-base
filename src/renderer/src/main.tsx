import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'
import './index.css'
import { QueryProvider } from './providers/query-provider'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </React.StrictMode>
)
