import path from "path";

export interface IPlatformAPI {
  async selectDirectory(): Promise<DirectoryEntity | undefined>;

  async listDirectories(path: string): Promise<DirectoryEntity[]>;

  async selectFile(): Promise<DirectoryEntity | undefined>;

  async readFile(path: string): Promise<string | undefined>;

  async saveFile(path: string, content: string): Promise<boolean>;

  async createDir(path: string): Promise<boolean>;

  async createFile(path: string): Promise<boolean>;

  async renameDir(oldPath: string, newPath: string): Promise<boolean>;
  
  async renameFile(oldPath: string, newPath: string): Promise<boolean>;

  async deleteDir(path: string): Promise<boolean>;

  async deleteFile(path: string): Promise<boolean>;

  async showSaveDialog(): Promise<string | undefined>;
  // 获取系统信息
  async getSystemInfo(): Promise<string>;

  // 打开开发者调试工具
  async openDevTools(): Promise<void>;
} 