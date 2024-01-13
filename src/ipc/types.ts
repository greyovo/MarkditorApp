export interface IBaseInvoker {
  fileMethods: IFileMethods
  systemMethods: ISystemMethods
}

export interface IFileMethods {
  // ... other methods
  
  /**
   * 获取文件信息
   * @param fileId 文件ID
   */
  getFileInfo(fileId: string): Promise<any>;

  /**
   * 打开文件
   */
  openFile(): Promise<string | undefined>;
}

export interface ISystemMethods {

  /**
   * 获取系统信息
   */
  getSystemInfo(): Promise<string>;

}