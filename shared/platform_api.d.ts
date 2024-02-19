import { IFileFilter, markdownFilter } from "./file_filters";

export interface IPlatformAPI {
  win: {
    // TODO
    close(): void,

    minimize(): void,

    toggleMaximize(): void,

    /**
     * Notify the callback when current window is about to close.
     * 
     * @param callback If `callback` returns `true`, continue closing, 
     * otherwise it will prevent window from closing.
     * @returns An unlisten function.
     */
    onWillClose(callback: () => Promise<boolean>): Promise<() => void>,
  }

  os: {
    async readCliArgs(): Promise<CliArgs>;
  }

  async selectDirectory(): Promise<DirectoryEntity | undefined>;

  async listDirectories(path: string): Promise<DirectoryEntity[]>;

  // 选择文件（使用对话框）
  async selectFile(filter: IFileFilter = markdownFilter): Promise<DirectoryEntity | undefined>;

  async readFile(path: string): Promise<string | undefined>;

  async saveFile(path: string, content: string): Promise<boolean>;

  async createDir(path: string): Promise<boolean>;

  async createFile(path: string): Promise<boolean>;

  async renameDir(oldPath: string, newPath: string): Promise<boolean>;

  async renameFile(oldPath: string, newPath: string): Promise<boolean>;

  async deleteDir(path: string): Promise<boolean>;

  async deleteFile(path: string): Promise<boolean>;

  async exists(path: string): Promise<boolean>;

  async showSaveDialog(): Promise<string | undefined>;
  // 获取系统信息
  async getSystemInfo(): Promise<string>;

  // 打开开发者调试工具
  async openDevTools(): Promise<void>;

  async openInBrowser(url: string): Promise<void>;

  // 在系统文件管理器中打开文件
  async locateFile(filePath: string): void;

  // 在系统文件管理器中打开文件夹
  async locateFolder(folderPath: string): void;
}

type CliArgs = {
  source?: string
}