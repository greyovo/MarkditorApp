export interface IElectronAPI {
  openFile: () => Promise<string | undefined>,
  openDevTools: () => Promise<string>,
  getSystemInfo: () => Promise<string>,
}

declare global {
  interface Window {
    __ElectronAPI__: IElectronAPI
  }
}