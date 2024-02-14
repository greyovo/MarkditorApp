import { PlatformAPI } from "@/ipc";
import { openFile, setRootDir } from "@/store/directory";
import { getParentDirectory } from "./path";

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

// After DOM is ready
export async function onAppReady() {

}

function registerEventListeners(): void {

}