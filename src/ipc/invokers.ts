import { electronFileMethods, tauriFileMethods } from "./methods/file_methods"
import { electronSystemMethods, tauriSystemMethods } from "./methods/system_methods"

export interface IBaseInvoker {
  fileMethods: IFileMethods
  systemMethods: ISystemMethods
}

export const electronInvoker: IBaseInvoker = {
  fileMethods: electronFileMethods,
  systemMethods: electronSystemMethods
}

export const tauriInvoker: IBaseInvoker = {
  fileMethods: tauriFileMethods,
  systemMethods: tauriSystemMethods
}

// ---------------------------------------------
export interface IFileMethods {
  // TODO 获取文件信息
  getFileInfo(fileId: string): Promise<any>;

  // 打开选择文件对话框
  openFile(): Promise<string | undefined>;
}

export interface ISystemMethods {
  // 获取系统信息
  getSystemInfo(): Promise<string>;
}