import { Log } from "../utils/log";
import { apiHandlers } from "./api_handlers";

type IPCHandlerAction = (...args: any[]) => Promise<any>

export interface IPCHanlder {
  name: string
  action: IPCHandlerAction
}

const ipcHandlers: IPCHanlder[] = []

// const apiHandlers = new APIHandlers()

Object.entries(apiHandlers).forEach(([key, val]) => {
  if (typeof val !== "function") {
    Object.entries(val).forEach(([subkey, fun]) => {
      const item: IPCHanlder = { name: [key, subkey].join("."), action: fun as IPCHandlerAction }
      Log("Regisier handler:", item);
      ipcHandlers.push(item)
    })
  } else {
    const item = { name: key, action: val }
    Log("Regisier handler:", item);
    ipcHandlers.push(item)
  }
})

// Object.keys(apiHandlers).forEach(element => {
//   const item = { name: element, action: apiHandlers[element as keyof APIHandlers] }
//   console.log(item);
//   ipcHandlers.push(item)
// });

export default ipcHandlers