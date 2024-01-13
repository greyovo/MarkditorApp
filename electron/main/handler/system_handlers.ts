// import { getSystemVersion } from "node:process"
import { IPCHanlder } from "./types"

export enum SystemMethodChannels{
  // 打开文件
  GetSystemInfo = 'GetSystemInfo'
}


const getSystemInfo = new IPCHanlder(
  SystemMethodChannels.GetSystemInfo,
  async (event, args): Promise<string | undefined> => {
    return "Hello! getSystemInfo invoked!"
  }
)

export { getSystemInfo }