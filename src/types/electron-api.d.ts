import { IPlatformAPI } from "shared/platformApi";

declare global {
  interface Window {
    __ElectronAPI__: IPlatformAPI
  }
}