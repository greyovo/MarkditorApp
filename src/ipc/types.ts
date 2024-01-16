export interface IBaseAPI {
  // 打开选择文件对话框
  openFile(): Promise<string | undefined>;

  // 获取系统信息
  getSystemInfo(): Promise<string>;

  // 打开开发者调试工具
  openDevTools(): Promise<void>;
}



