import path from "path";

export interface IPlatformAPI {
  selectDirectory(): Promise<DirectoryEntity | undefined>;

  listDirectories(path: string): Promise<(DirectoryEntity | FileEntity)[]>;

  selectFile(): Promise<FileEntity | undefined>;

  readFile(path: string): Promise<string | undefined>;

  saveFile(path: string, content: string): Promise<boolean>;

  showSaveDialog(): Promise<string | undefined>;
  // 获取系统信息
  getSystemInfo(): Promise<string>;

  // 打开开发者调试工具
  openDevTools(): Promise<void>;
} 