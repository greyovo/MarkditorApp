import { NotImplementError } from "@/utils/errors"
import { ElectronAPI } from "./electron_api";
import { TauriAPI } from "./tauri_api";
import { IPlatformAPI } from "shared/platform_api";
import { EnvConstants } from "@/utils/constants";

let PlatformAPI: IPlatformAPI

if (EnvConstants.isElectron) {
  PlatformAPI = ElectronAPI
} else if (EnvConstants.isTauri) {
  PlatformAPI = TauriAPI
}

export { PlatformAPI }