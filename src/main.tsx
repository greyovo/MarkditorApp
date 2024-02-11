import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@radix-ui/themes/styles.css';
import './global.css'
import { Theme, ThemePanel } from '@radix-ui/themes'
import "vditor/dist/index.css"
import { DialogProvider } from './components/dialog/DialogContext';
import { Dialog } from './components/dialog/Dialog';
import { initDirectoryStore } from './store/directory';
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Theme appearance="dark" className='dark'>
      <DialogProvider>
        <App />
        <Dialog />
        <Toaster position="bottom-right" richColors closeButton duration={3000} />
        <ThemePanel />
      </DialogProvider>
      {/* <ThemePanel /> */}
    </Theme>
  </React.StrictMode>
)

postMessage({ payload: 'removeLoading' }, '*')
initDirectoryStore()