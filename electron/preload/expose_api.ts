import { contextBridge, ipcRenderer } from 'electron'
import { FileMethodChannels } from 'electron/main/handler/file_handlers'

contextBridge.exposeInMainWorld("electronAPI", {
  // 打开系统文件选择对话框
  openFile: (): Promise<string> => ipcRenderer.invoke(FileMethodChannels.ShowOpenFileDialog),
  getSystemInfo: (): Promise<string> => ipcRenderer.invoke("")
})