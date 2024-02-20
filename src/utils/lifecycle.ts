import { PlatformAPI } from "@/ipc";
import { openFile, setRootDir } from "@/store/directory";
import { getParentDirectory } from "./path";
import { EnvConstants } from "./constants";
import { initDirectoryOpenListener } from "@/store/preference";

// Before DOM is ready
export async function onAppLaunch() {
  const defaultFilePath = (await PlatformAPI.os.readCliArgs()).source
  if (defaultFilePath) {
    if (await PlatformAPI.exists(defaultFilePath)) {
      openFile(defaultFilePath)
      setRootDir(getParentDirectory(defaultFilePath))
    }
  }
  registerEventListeners()
}

let unlistenDirOpen: () => void | undefined
// After DOM is ready
export async function onAppReady() {
  unlistenDirOpen = initDirectoryOpenListener()
}

export function onAppExit() {
  unlistenDirOpen?.()
}

function registerEventListeners(): void {

}