import { ISystemAPI } from "common/ipc"
import { app } from "electron"
import { openDevTools } from "../Main"
// import { openDevTools } from "../Main"

export const systemHandlers: ISystemAPI = {

  getSystemInfo: async (): Promise<string> => {
    return "Hello! getSystemInfo invoked!"
  },

  openDevTools: async (): Promise<void> => {
    openDevTools()
  }
}