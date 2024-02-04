import { app, contextBridge, ipcRenderer } from 'electron'
import ipcHandlers from '../main/handler';
import { IPlatformAPI } from 'shared/platformApi';

export function exposeApi() {
  const bridge: any = {};

  ipcHandlers.forEach((handler) => {
    if (handler.name.includes(".")) {
      const [key, subkey] = handler.name.split(".");
      if (bridge[key] === undefined) {
        bridge[key] = {}
      }
      bridge[key][subkey] = async (...args: any) => {
        return ipcRenderer.invoke(handler.name, ...args);
      }
    } else {
      bridge[handler.name] = async (...args: any) => {
        console.log("Preload", handler.name);
        return ipcRenderer.invoke(handler.name, ...args);
      }
    }
  });

  contextBridge.exposeInMainWorld("__ElectronAPI__", bridge)
}