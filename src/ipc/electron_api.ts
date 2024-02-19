import { CliArgs, IPlatformAPI } from "shared/platform_api";

export const ElectronAPI: IPlatformAPI = {
  async createDir(path: string): Promise<boolean> {
    return await window.__ElectronAPI__.createDir(path);
  },
  async createFile(path: string): Promise<boolean> {
    return await window.__ElectronAPI__.createFile(path);
  },
  async renameDir(oldPath: string, newPath: string): Promise<boolean> {
    return await window.__ElectronAPI__.renameDir(oldPath, newPath);
  },
  async renameFile(oldPath: string, newPath: string): Promise<boolean> {
    return await window.__ElectronAPI__.renameFile(oldPath, newPath);
  },
  async deleteDir(path: string): Promise<boolean> {
    return await window.__ElectronAPI__.deleteDir(path);
  },
  async deleteFile(path: string): Promise<boolean> {
    return await window.__ElectronAPI__.deleteFile(path);
  },

  async selectDirectory(): Promise<DirectoryEntity | undefined> {
    return await window.__ElectronAPI__.selectDirectory();
  },

  async selectFile(): Promise<DirectoryEntity | undefined> {
    // const filePath = await ipcRenderer.invoke(FileMethodChannels.ShowOpenFileDialog)
    return await window.__ElectronAPI__.selectFile();
  },

  async readFile(path: string): Promise<string | undefined> {
    return await window.__ElectronAPI__.readFile(path);
  },

  async listDirectories(path: string): Promise<DirectoryEntity[]> {
    return await window.__ElectronAPI__.listDirectories(path);
  },

  async showSaveDialog(): Promise<string | undefined> {
    return await window.__ElectronAPI__.showSaveDialog();
  },

  async saveFile(path: string, content: string): Promise<boolean> {
    return await window.__ElectronAPI__.saveFile(path, content);
  },

  async getSystemInfo(): Promise<any> {
    return await window.__ElectronAPI__.getSystemInfo();
  },

  async openDevTools(): Promise<void> {
    await window.__ElectronAPI__.openDevTools();
  },

  win: {
    close: function (): void {
      window.__ElectronAPI__.win.close();
    },
    minimize: function (): void {
      window.__ElectronAPI__.win.minimize();
    },
    toggleMaximize: function (): void {
      window.__ElectronAPI__.win.toggleMaximize();
    },
    onWillClose: function (callback: () => Promise<boolean>) {
      throw new Error("Method not implemented.");
    }
  },
  exists: function (path: string): Promise<boolean> {
    throw new Error("Function not implemented.");
  },
  openInBrowser: function (url: string): Promise<void> {
    throw new Error("Function not implemented.");
  },
  os: {
    readCliArgs: function (): Promise<CliArgs> {
      throw new Error("Function not implemented.");
    }
  },
  copyFile: function (source: string, dest: string): Promise<boolean> {
    throw new Error("Function not implemented.");
  },
  locateFile: function (filePath: string): void {
    throw new Error("Function not implemented.");
  },
  locateFolder: function (folderPath: string): void {
    throw new Error("Function not implemented.");
  }
}