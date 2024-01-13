import { contextBridge, ipcRenderer } from 'electron'
import { FileMethodChannels } from 'electron/main/handler/file_handlers'
import { SystemMethodChannels } from 'electron/main/handler/system_handlers'

export function exposeApi() {
  contextBridge.exposeInMainWorld("electronAPI", {
    // 打开系统文件选择对话框
    openFile: (): Promise<string> => ipcRenderer.invoke("ShowOpenFileDialog"),

    // 获取系统信息
    getSystemInfo: (): Promise<string> => ipcRenderer.invoke("GetSystemInfo")
  })
}