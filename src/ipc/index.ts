import { NotImplementError } from "@/utils/errors"
import { IBaseInvoker, electronInvoker, tauriInvoker } from "./invokers"

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