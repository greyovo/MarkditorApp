type IPCHandlerAction = (event: Electron.IpcMainInvokeEvent, ...args: any[]) => Promise<any>

export class IPCHanlder {
  name: string
  action: IPCHandlerAction

  constructor(name: string, action: IPCHandlerAction) {
    this.name = name
    this.action = action
  }
}