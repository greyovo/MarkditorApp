import { ipcRenderer } from "electron";
import { ISystemMethods } from "../types";
import { NotImplementError } from "@/utils/errors";

export const electronSystemMethods: ISystemMethods = {

  async getSystemInfo(): Promise<any> {
    return await window.electronAPI.getSystemInfo()
  }

}


export const tauriSystemMethods: ISystemMethods = {

  getSystemInfo(): Promise<any> {
    throw new NotImplementError("Method not supported")
  }

}