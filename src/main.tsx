import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemedApp } from './App'
import '@radix-ui/themes/styles.css';
import './global.css'
import "vditor/dist/index.css"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemedApp />
  </React.StrictMode>
)

postMessage({ payload: 'removeLoading' }, '*')