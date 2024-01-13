import { dialog } from "electron"
import { IPCHanlder } from "./types"

export enum FileMethodChannels{
  // 打开文件
  ShowOpenFileDialog = 'ShowOpenFileDialog'
}


const openFile = new IPCHanlder(
  FileMethodChannels.ShowOpenFileDialog,
  async (event, args): Promise<string | undefined> => {
    const { canceled, filePaths } = await dialog.showOpenDialog({})
    if (!canceled) {
      return filePaths[0]
    }
  }
)

export { openFile }