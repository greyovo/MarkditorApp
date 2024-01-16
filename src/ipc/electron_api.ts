import { IBaseAPI } from "./types";

export const electronAPI: IBaseAPI = {
  async openFile(): Promise<string | undefined> {
    // const filePath = await ipcRenderer.invoke(FileMethodChannels.ShowOpenFileDialog)
    const filePath = await window.__ElectronAPI__.openFile()
    return filePath
  },

  async getSystemInfo(): Promise<any> {
    return await window.__ElectronAPI__.getSystemInfo();
  },

  async openDevTools(): Promise<void> {
    await window.__ElectronAPI__.openDevTools();
  }
}