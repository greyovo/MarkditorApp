import { update } from './update'
import { BrowserWindow, Menu, app, ipcMain, shell } from "electron";
import EventEmitter from "events";
import ipcHandlers from './handler';
import { join } from 'path';
import { Log } from './utils/log';

const appName = "Markditor";

let mainWindow: BrowserWindow | null = null

export class Main {
  private windowSettings: { [key: string]: any };
  private win: BrowserWindow | null = null

  public onEvent: EventEmitter = new EventEmitter();

  constructor(settings: { [key: string]: any }) {
    this.windowSettings = settings

    app.whenReady().then(() => this.onReady());
    app.on('activate', this.onActivate);
    app.on('window-all-closed', this.onWindowAllClosed);
    app.on('second-instance', this.onSecondInstance);
  }

  private async createWindow() {
    const settings = this.windowSettings
    app.name = appName
    this.win = new BrowserWindow({
      ...settings,
      backgroundColor: '#fff', // https://www.electronjs.org/docs/latest/faq#the-font-looks-blurry-what-is-this-and-what-can-i-do
      webPreferences: {
        preload: settings.preload,
        // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
        // Consider using contextBridge.exposeInMainWorld
        // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
        // nodeIntegration: false,
        contextIsolation: true,
      },
      titleBarStyle: "hidden",
      // titleBarOverlay: {
      //   color: '#FFFFFF', // TODO 适配深色模式？
      //   // symbolColor: '#FFFFFF',
      //   height: 32
      // }
    })
    mainWindow = this.win

    if (this.windowSettings.url) { // electron-vite-vue#298
      this.win.loadURL(this.windowSettings.url)
      // Open devTool if the app is not packaged
      this.win.webContents.openDevTools()
    } else {
      this.win.loadFile(this.windowSettings.indexHtml)
    }

    // Test actively push message to the Electron-Renderer
    this.win.webContents.on('did-finish-load', () => {
      this.win?.webContents.send('main-process-message', new Date().toLocaleString())
    })

    // Make all links open with the browser, not with the application
    this.win.webContents.setWindowOpenHandler(({ url }) => {
      if (url.startsWith('https:')) shell.openExternal(url)
      return { action: 'deny' }
    })
    // Apply electron-updater
    // update(this.win)
    this.win.on('maximize', () => {
      this.win?.webContents.send('maximize-change', true)
    })

    this.win.on('unmaximize', () => {
      this.win?.webContents.send('maximize-change', false)
    })
  }

  private onReady() {
    this.registerIpcHandlers()
    Menu.setApplicationMenu(null)
    this.createWindow()
  }

  private onActivate() {
    if (BrowserWindow.getAllWindows().length === 0)
      this.createWindow()
  }

  private onWindowAllClosed() {
    this.win = null
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }

  private onSecondInstance() {
    if (this.win) {
      // Focus on the main window if the user tried to open another
      if (this.win.isMinimized()) this.win.restore()
      this.win.focus()
    }
  }

  private registerIpcHandlers() {
    ipcHandlers.forEach(
      handler => ipcMain.handle(handler.name, async (ev, ...args) => {
        Log("Handler called:", handler.name, "[args.length]", args.length)
        return handler.action(...args)
      })
    )
  }

  public getMainWindow() {
    return this.win;
  }
}


export function openDevTools() {
  mainWindow?.webContents.openDevTools()
}

export function setMainWindowName(name: string) {
  mainWindow?.setTitle(name)
}


export function minimizeWindow() {
  mainWindow?.minimize()
}

export function toggleMaximizeWindow() {
  if (mainWindow?.isMaximized()) {
    mainWindow?.unmaximize()
  } else {
    mainWindow?.maximize()
  }
}

export function closeWindow() {
  mainWindow?.close()
  app.quit()
}

export function notifyMainWindow(channel: string, ...args: any[]): void {
  mainWindow?.webContents.send(channel, ...args)
}