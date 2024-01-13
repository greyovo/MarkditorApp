import { ipcRenderer } from "electron";
import { IFileMethods } from "../types";

// -----------------------------------------------

export const electronFileMethods: IFileMethods = {
  getFileInfo(fileId: string): Promise<any> {
    throw new Error("Method not implemented.");
  },

  async openFile(): Promise<string | undefined> {
    // const filePath = await ipcRenderer.invoke(FileMethodChannels.ShowOpenFileDialog)
    const filePath = await window.electronAPI.openFile()
    return filePath
  }

}


export const tauriFileMethods: IFileMethods = {
  getFileInfo(fileId: string): Promise<any> {
    throw new Error("Method not implemented.");
  },

  async openFile(): Promise<string | undefined> {
    throw new Error("Method not implemented.");
  }

}