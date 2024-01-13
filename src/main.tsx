import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@radix-ui/themes/styles.css';
import './global.css'
import { Theme, ThemePanel } from '@radix-ui/themes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Theme>
      <App />
      {/* <ThemePanel /> */}
    </Theme>
  </React.StrictMode>
)

postMessage({ payload: 'removeLoading' }, '*')
