import { NotImplementError } from "@/utils/errors"
import { ElectronAPI } from "./electron_api";
import { TauriAPI } from "./tauri_api";
import { IPlatformAPI } from "common/ipc";

const backend = import.meta.env.VITE_BACKEND ?? "unknown"
console.log("Running with backend:", backend);

const isElectron = backend === "electron"
const isTauri = backend === "tauri"

let PlatformAPI: IPlatformAPI

if (isElectron) {
  PlatformAPI = new ElectronAPI()
} else if (isTauri) {
  PlatformAPI = new TauriAPI()
} else {
  throw new NotImplementError(`Unsupported backend: ${backend}. 
Please set the right backend via environment variable.`)
}

export { PlatformAPI }