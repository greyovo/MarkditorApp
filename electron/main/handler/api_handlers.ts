import { IPlatformAPI } from "shared/platformApi";
import { closeWindow, minimizeWindow, openDevTools, setMainWindowName, toggleMaximizeWindow } from "../main_window";
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
        children: [],
        createDate: item.birthtimeMs,
        lastModifiedDate: item.mtimeMs,
      };
    }
  },

  selectDirectory: async function (): Promise<DirectoryEntity | undefined> {
    const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ["openDirectory"] });
    const path = filePaths[0];
    if (!canceled) {
      const item = fs.statSync(path);
      const children = await getChildrenDirectories(path);

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
    return "Hello! This is electron.";
  },

  async openDevTools(): Promise<void> {
    openDevTools();
  },

  async listDirectories(path: string): Promise<(DirectoryEntity)[]> {
    return getChildrenDirectories(path);
  },


  ///////////////////////////////////
  // File Operation
  ///////////////////////////////////
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

  createFile: function (path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        fs.writeFileSync(path, "");
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  },

  renameFile: function (oldPath: string, newPath: string): Promise<boolean> {
    return this.renameDir(oldPath, newPath);
  },

  deleteFile: function (path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        fs.rmSync(path);
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  },

  ///////////////////////////////////
  // Directory Operation
  ///////////////////////////////////
  createDir: async function (path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        fs.mkdirSync(path);
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  },

  deleteDir: async function (path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        fs.rmdirSync(path, { recursive: true });
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  },

  renameDir: function (oldPath: string, newPath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        fs.renameSync(oldPath, newPath);
        resolve(true);
      }
      catch (error) {
        reject(false);
      }
    });
  },

  win: {
    close: function (): void {
      closeWindow()
    },

    minimize: function (): void {
      minimizeWindow()
    },

    toggleMaximize: function (): void {
      toggleMaximizeWindow()
    },

  }
}