import { NotImplementError } from "@/utils/errors";
import { IPlatformAPI } from "shared/platformApi";

export class TauriAPI implements IPlatformAPI {
  selectFile(): Promise<DirectoryEntity | undefined> {
    throw new Error("Method not implemented.");
  }
  selectDirectory(): Promise<DirectoryEntity | undefined> {
    throw new Error("Method not implemented.");
  }
  readFile(path: string): Promise<string | undefined> {
    throw new Error("Method not implemented.");
  }
  saveFile(path: string, content: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  showSaveDialog(): Promise<string | undefined> {
    throw new Error("Method not implemented.");
  }
  getSystemInfo(): Promise<string> {
    throw new Error("Method not implemented.");
  }
  openDevTools(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  listDirectories(path: string): Promise<DirectoryEntity[]> {
    throw new Error("Method not implemented.");
  }

}