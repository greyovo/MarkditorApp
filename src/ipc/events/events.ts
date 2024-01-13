import { NotImplementError } from "@/utils/errors"
import { IpcRendererEvent, ipcRenderer } from "electron"

const backend = process.env.backend ?? "electron"
const isElectron = backend === "electron"
const isTauri = backend === "tauri"



enum EventChannels {
  MainProcessMessage = ("main-process-message")
}

export const IPCEvnetListener = {
  on(channel: EventChannels, func: (_event: IpcRendererEvent, ...args: any[]) => void) {
    if (isElectron) {
      ipcRenderer.on(channel, func)
    } else {
      throw new NotImplementError(`Platform ${backend} is not yet supported`)
    }
  }
}