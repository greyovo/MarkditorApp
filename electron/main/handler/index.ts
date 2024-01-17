import { systemHandlers } from "./system_handlers";
import { fileHandlers } from "./file_handlers";

type IPCHandlerAction = (...args: any[]) => Promise<any>

export interface IPCHanlder {
  name: string
  action: IPCHandlerAction
}

const ipcHandlers: IPCHanlder[] = []

Object.entries(fileHandlers).forEach(([key, fun]) => {
  ipcHandlers.push({ name: fun.name, action: fun })
})

Object.entries(systemHandlers).forEach(([key, fun]) => {
  ipcHandlers.push({ name: fun.name, action: fun })
})

export default ipcHandlers