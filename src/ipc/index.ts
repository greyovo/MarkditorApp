import { NotImplementError } from "@/utils/errors"
import { ElectronAPI } from "./electron_api";
import { TauriAPI } from "./tauri_api";
import { IPlatformAPI } from "shared/platformApi";
import { Constants } from "@/utils/constants";


let PlatformAPI: IPlatformAPI

if (Constants.isElectron) {
  PlatformAPI = ElectronAPI
} else if (Constants.isTauri) {
  PlatformAPI = TauriAPI
}

export { PlatformAPI }