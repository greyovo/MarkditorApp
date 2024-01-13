export interface IElectronAPI {
  openFile: () => Promise<string | undefined>,
  getSystemInfo: () => Promise<string>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}