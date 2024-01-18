import { app, contextBridge, ipcRenderer } from 'electron'
import ipcHandlers from '../main/handler';

export function exposeApi() {
  const bridge: any = {};

  ipcHandlers.forEach((handler) => {
    bridge[handler.name] = async (...args: any) => {
      // console.log("Preload", handler.name);
      return ipcRenderer.invoke(handler.name, ...args);
    }
  });

  contextBridge.exposeInMainWorld("__ElectronAPI__", bridge)
}