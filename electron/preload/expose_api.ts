import { app, contextBridge, ipcRenderer } from 'electron'
import ipcHandlers from '../main/handler';
import { IPlatformAPI } from 'shared/platformApi';

function buildFunction(name: string) {
  return async (...args: any) => {
    return ipcRenderer.invoke(name, ...args);
  }
}

function buildListener(name: string) {
  return (callback: (event: any, ...value: any) => void) => {
    return ipcRenderer.on(name, callback);
  }
}

export function exposeApi() {
  const bridge: any = {};

  ipcHandlers.forEach((handler) => {
    if (handler.name.includes(".")) {
      const [key, subkey] = handler.name.split(".");
      if (bridge[key] === undefined) {
        bridge[key] = {}
      }
      if (subkey.startsWith("on")) {
        bridge[key][subkey] = buildListener(handler.name)
      } else {
        bridge[key][subkey] = buildFunction(handler.name)
      }
    } else {
      // register function
      // bridge[handler.name] = async (...args: any) => {
      //   return ipcRenderer.invoke(handler.name, ...args);
      // }
      if (handler.name.startsWith("on")) {
        bridge[handler.name] = buildListener(handler.name)
      } else {
        bridge[handler.name] = buildFunction(handler.name)
      }
      // TODO register listener
    }
  });

  bridge.onMaximizedChanged = (callback: (maximized: boolean) => void): () => void => {
    ipcRenderer.on('maximize-change', (_event, value) => callback(value))
    return () => ipcRenderer.removeListener('maximize-change', (_event, value) => callback(value))
  },

  contextBridge.exposeInMainWorld("__ElectronAPI__", bridge)
}