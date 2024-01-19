import { IPlatformAPI } from "shared/platformBindngs";

declare global {
  interface Window {
    __ElectronAPI__: IPlatformAPI
  }
}