import { dialog } from "electron"
import fs from "fs"
import { IFilesAPI } from "common/ipc"

export const fileHandlers: IFilesAPI = {
  openFile: async (): Promise<{ path: string, content: string } | undefined> => {
    const { canceled, filePaths } = await dialog.showOpenDialog({})
    if (!canceled) {
      const content = fs.readFileSync(filePaths[0], 'utf8');

      return { path: filePaths[0], content }
    }
  },

  saveFile: async (path: string, content: string): Promise<boolean> => {
    try {
      fs.writeFileSync(path, content)
      return true
    } catch (error) {
      return false
    }
  }
}