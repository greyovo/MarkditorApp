import { IPlatformAPI } from "shared/platform_api";

declare global {
  interface Window {
    __ElectronAPI__: IPlatformAPI
  }
}