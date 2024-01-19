import { IPlatformAPI } from "shared/platformBindngs";
import { openDevTools, setMainWindowName } from "../Main";
import fs from "fs"
import { dialog } from "electron";
import { getChildrenDirectories, getFileNameFromPath } from "../utils/directoryUtils";

export const apiHandlers: IPlatformAPI = {
  async selectFile(): Promise<DirectoryEntity | undefined> {
    const { canceled, filePaths } = await dialog.showOpenDialog({});
    if (!canceled) {
      const item = fs.statSync(filePaths[0]);

      return {
        type: "file",
        name: getFileNameFromPath(filePaths[0]),
        path: filePaths[0],
        size: item.size,
        createDate: item.birthtimeMs,
        lastModifiedDate: item.mtimeMs,
      };
    }
  },

  selectDirectory: async function (): Promise<DirectoryEntity | undefined> {
    const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ["openDirectory"] });
    const path = filePaths[0]
    if (!canceled) {
      const item = fs.statSync(path);
      const children = await getChildrenDirectories(path)

      return {
        type: "dir",
        name: getFileNameFromPath(path),
        path,
        createDate: item.birthtimeMs,
        lastModifiedDate: item.mtimeMs,
        children,
      };
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
    return new Promise((resolve, reject) => {
      try {
        fs.writeFileSync(path, content);
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  },

  async getSystemInfo(): Promise<string> {
    return "Hello! getSystemInfo invoked!";
  },

  async openDevTools(): Promise<void> {
    openDevTools();
  },

  async listDirectories(path: string): Promise<(DirectoryEntity)[]> {
    return getChildrenDirectories(path);
  },

  async readFile(path: string): Promise<string | undefined> {
    return new Promise<string>((resolve, reject) => {
      try {
        const res = fs.readFileSync(path, 'utf8');
        resolve(res);
      } catch (error) {
        reject("cannot read file from: " + path);
      }
    });
  },


}