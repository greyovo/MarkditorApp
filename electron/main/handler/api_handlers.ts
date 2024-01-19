import { IPlatformAPI } from "shared/platformApi";
import { openDevTools, setMainWindowName } from "../Main";
import fs from "fs"
import { dialog } from "electron";
import { Log } from "../utils/log";
import { mainApp } from "..";
import path from "path";
import { getChildrenDirectories } from "../utils/directoryUtils";

export const apiHandlers: IPlatformAPI = {
  async openFile(): Promise<{ path: string; content: string; } | undefined> {
    const { canceled, filePaths } = await dialog.showOpenDialog({});
    if (!canceled) {
      const content = fs.readFileSync(filePaths[0], 'utf8');

      return { path: filePaths[0], content };
    }
  },

  async showSaveDialog(): Promise<string | undefined> {
    const { filePath } = await dialog.showSaveDialog({});
    if (!filePath) {
      return undefined;
    }
    return filePath!.endsWith("md") ? filePath! : filePath! + ".md";
  },

  async saveFile(path: string, content: string): Promise<boolean> {
    try {
      Log("saveFile", path, "content.length:", content.length);
      fs.writeFileSync(path, content);
      return true;
    } catch (error) {
      return false;
    }
  },

  async getSystemInfo(): Promise<string> {
    return "Hello! getSystemInfo invoked!";
  },

  async openDevTools(): Promise<void> {
    openDevTools();
  },

  async listDirectories(path: string): Promise<(DirectoryEntity | FileEntity)[]> {
    return getChildrenDirectories(path)
  }
}