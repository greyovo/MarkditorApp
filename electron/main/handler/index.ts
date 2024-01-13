import { ipcMain } from "electron";
import { IPCHanlder } from "./types";
import { openFile } from "./file_handlers";


export const ipcHandlers: IPCHanlder[] = [
  openFile
]