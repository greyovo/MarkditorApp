import { NotImplementError } from "@/utils/errors";
import { IBaseAPI } from "./types";

export const tauriAPI: IBaseAPI = {
  async openFile(): Promise<string | undefined> {
    throw new Error("Method not implemented.");
  },

  getSystemInfo(): Promise<any> {
    throw new NotImplementError("Method not supported");
  },

  openDevTools: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
}