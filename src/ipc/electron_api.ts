import { IPlatformAPI } from "shared/platformApi";

export class ElectronAPI implements IPlatformAPI {
  async selectDirectory(): Promise<DirectoryEntity | undefined> {
    return await window.__ElectronAPI__.selectDirectory();
  }

  async selectFile(): Promise<DirectoryEntity | undefined> {
    // const filePath = await ipcRenderer.invoke(FileMethodChannels.ShowOpenFileDialog)
    return await window.__ElectronAPI__.selectFile();
  }

  async readFile(path: string): Promise<string | undefined> {
    return await window.__ElectronAPI__.readFile(path);
  }

  async listDirectories(path: string): Promise<DirectoryEntity[]> {
    return await window.__ElectronAPI__.listDirectories(path);
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