import { NotImplementError } from "@/utils/errors";
import { IPlatformAPI } from "common/ipc";

export const tauriAPI: IPlatformAPI = {
  async openFile(): Promise<{ path: string, content: string } | undefined> {
    throw new NotImplementError("Method not supported");
  },

  getSystemInfo(): Promise<any> {
    throw new NotImplementError("Method not supported");
  },

  openDevTools: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },

  saveFile: function (path: string, content: string): Promise<boolean> {
    throw new Error("Function not implemented.");
  }
}