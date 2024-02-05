import { NotImplementError } from "@/utils/errors";
import { IPlatformAPI } from "shared/platformApi";

export const TauriAPI: IPlatformAPI = {
  selectDirectory(): Promise<DirectoryEntity | undefined> {
    throw new Error("Method not implemented.");
  },
  listDirectories(path: string): Promise<DirectoryEntity[]> {
    throw new Error("Method not implemented.");
  },
  selectFile(): Promise<DirectoryEntity | undefined> {
    throw new Error("Method not implemented.");
  },
  readFile(path: string): Promise<string | undefined> {
    throw new Error("Method not implemented.");
  },
  saveFile(path: string, content: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  },
  createDir(path: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  },
  createFile(path: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  },
  renameDir(oldPath: string, newPath: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  },
  renameFile(oldPath: string, newPath: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  },
  deleteDir(path: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  },
  deleteFile(path: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  },
  showSaveDialog(): Promise<string | undefined> {
    throw new Error("Method not implemented.");
  },
  getSystemInfo(): Promise<string> {
    throw new Error("Method not implemented.");
  },
  openDevTools(): Promise<void> {
    throw new Error("Method not implemented.");
  },
  win: {
    close: function (): void {
      throw new Error("Function not implemented.");
    },
    minimize: function (): void {
      throw new Error("Function not implemented.");
    },
    toggleMaximize: function (): void {
      throw new Error("Function not implemented.");
    },
  }
}