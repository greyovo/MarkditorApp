import { NotImplementError } from "@/utils/errors"
import { IBaseInvoker } from "./types"
import { electronFileMethods, tauriFileMethods } from "./methods/file_methods"
import { electronSystemMethods, tauriSystemMethods } from "./methods/system_methods"

const electronInvoker: IBaseInvoker = {
  fileMethods: electronFileMethods,
  systemMethods: electronSystemMethods
}

const tauriInvoker: IBaseInvoker = {
  fileMethods: tauriFileMethods,
  systemMethods: tauriSystemMethods
}

// ---------------------------------------------------

const backend = import.meta.env.VITE_BACKEND ?? "unknown"
console.log("Running with backend:", backend);

const isElectron = backend === "electron"
const isTauri = backend === "tauri"

let API: IBaseInvoker

if (isElectron) {
  API = electronInvoker
} else if (isTauri) {
  API = tauriInvoker
} else {
  throw new NotImplementError(`Unsupported backend: ${backend}`)
}

export { API }