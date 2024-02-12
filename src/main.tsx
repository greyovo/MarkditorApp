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
import usePreferenceStore from './store/preference';

const Root = () => {
  const themeMode = usePreferenceStore((state) => state.themeMode())
  return (
    <React.StrictMode>
      <Theme appearance={themeMode} className={themeMode === "dark" ? "dark" : ""}>
        <DialogProvider>
          <App />
          <Dialog />
          <Toaster position="bottom-right" richColors closeButton duration={3000} />
        </DialogProvider>
        {/* <ThemePanel /> */}
      </Theme>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Root />)

postMessage({ payload: 'removeLoading' }, '*')
initDirectoryStore()