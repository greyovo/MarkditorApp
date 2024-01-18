import { IPlatformAPI } from "common/ipc";

export class ElectronAPI implements IPlatformAPI {
  async openFile(): Promise<{ path: string, content: string } | undefined> {
    // const filePath = await ipcRenderer.invoke(FileMethodChannels.ShowOpenFileDialog)
    return await window.__ElectronAPI__.openFile();
  }

  async showSaveDialog(): Promise<string | undefined> {
    return await window.__ElectronAPI__.showSaveDialog();
  }

  async saveFile(path: string, content: string): Promise<boolean> {
    return await window.__ElectronAPI__.saveFile(path, content);
  }

  async getSystemInfo(): Promise<any> {
    return await window.__ElectronAPI__.getSystemInfo();
  }

  async openDevTools(): Promise<void> {
    await window.__ElectronAPI__.openDevTools();
  }


}