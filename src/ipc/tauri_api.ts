import { NotImplementError } from "@/utils/errors";
import { IPlatformAPI } from "common/ipc";

export class TauriAPI implements IPlatformAPI {
  async openFile(): Promise<{ path: string, content: string } | undefined> {
    throw new NotImplementError("Method not supported");
  }

  showSaveDialog(): Promise<string | undefined> {
    throw new Error("Method not implemented.");
  }

  saveFile(path: string, content: string): Promise<boolean> {
    throw new Error("Function not implemented.");
  }

  getSystemInfo(): Promise<any> {
    throw new NotImplementError("Method not supported");
  }

  openDevTools(): Promise<void> {
    throw new Error("Function not implemented.");
  }


}