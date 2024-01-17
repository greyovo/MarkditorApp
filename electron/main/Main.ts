import { update } from './update'
import { BrowserWindow, Menu, app, ipcMain, shell } from "electron";
import EventEmitter from "events";
import { ipcHandlers } from './handler';

const appName = "Markditor";

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
    })

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
  }

  private onReady() {
    this.registerIpcHandlers()
    // Menu.setApplicationMenu(null)
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
      handler => ipcMain.handle(handler.name, handler.action)
    )
  }

  public getMainWindow() {
    return this.win;
  }
}