import { app, BrowserWindow, shell, ipcMain, Menu } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
import { update } from './update'
import { Main } from './main_window'

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//

process.env.DIST_ELECTRON = join(__dirname, '../')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

const defaultWindowSettings = {
  title: "Markditor",
  width: 1280,
  height: 700,
  icon: join(process.env.VITE_PUBLIC, 'favicon.ico'),
  preload: join(__dirname, '../preload/index.js'),
  url: process.env.VITE_DEV_SERVER_URL,
  indexHtml: join(process.env.DIST, 'index.html')
}

export const mainApp = new Main(defaultWindowSettings)