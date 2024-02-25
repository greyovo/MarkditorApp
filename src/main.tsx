import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { ThemedApp } from './App'
import '@radix-ui/themes/styles.css';
import './global.css'
import "vditor/dist/index.css"
import '@/i18n/i18n';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback="loading">
      <ThemedApp />
    </Suspense>
  </React.StrictMode>
)

postMessage({ payload: 'removeLoading' }, '*')