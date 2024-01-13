export interface IElectronAPI {
  openFile: () => Promise<string | undefined>,
  getSystemInfo: () => Promise<string | undefined>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}