import { IPlatformAPI } from "common/ipc";

declare global {
  interface Window {
    __ElectronAPI__: IPlatformAPI
  }
}