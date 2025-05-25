import { getCurrentWindow  } from '@tauri-apps/api/window'
import { mkdir, readDir, remove, rename, writeTextFile, readTextFile, exists, copyFile } from '@tauri-apps/plugin-fs';
import { open as openDialog, save } from '@tauri-apps/plugin-dialog';
import { invoke } from '@tauri-apps/api/core';
import { CliArgs, IPlatformAPI } from "shared/platform_api";
import { getNameFromPath, isMarkdownFile, pathJoin } from '@/utils/path';
import { Command, open as openIn } from '@tauri-apps/plugin-shell';
import { getMatches } from '@tauri-apps/plugin-cli';
import { IFileFilter, markdownFilter } from '@shared/file_filters';
import { platform } from '@tauri-apps/plugin-os';

const appWindow = getCurrentWindow()


export const TauriAPI: IPlatformAPI = {
  async selectDirectory(): Promise<DirectoryEntity | undefined> {
    const selectedPath = await openDialog({
      multiple: false,
      directory: true,
    });
    if (selectedPath && typeof selectedPath === 'string') {
      return {
        type: "dir",
        name: getNameFromPath(selectedPath),
        path: selectedPath,
        children: await this.listDirectories(selectedPath),
      };
    }
    return undefined;
  },

  async listDirectories(parentPath: string): Promise<DirectoryEntity[]> {
    const entries = await readDir(parentPath);
    const dirs: DirectoryEntity[] = [];
    const files: DirectoryEntity[] = [];
    for (const entry of entries) {
      const path = pathJoin(parentPath, entry.name ?? "")
      if (entry.isDirectory) {
        dirs.push({
          type: "dir",
          name: entry.name ?? "",
          path: path,
          children: []
        });
      } else {
        if (isMarkdownFile(path  ?? "")) {
          files.push({
            type: "file",
            name: entry.name ?? "",
            path: path,
            children: []
          });
        }
      }
    }
    return [...dirs, ...files];
  },

  os: {
    readCliArgs: async function (): Promise<CliArgs> {
      const matches = await getMatches();
      console.log("args:", JSON.stringify(matches, null, 2));
      const parsedArgs: CliArgs = {};
      if (matches.args) {
        const args = matches.args;
        try {
          parsedArgs.source = args?.source?.value as string ?? "";
        } catch (err) {
          console.error(err);
        }
      }
      return parsedArgs;
    },

    setAsDefaultOpenApp: async function (): Promise<boolean> {
      try {
        await invoke("set_default_open_win32")
        return true
      } catch (err) {
        console.error(err);
        return false
      }
    }
  },

  async selectFile(filter: IFileFilter = markdownFilter()): Promise<DirectoryEntity | undefined> {
    const selectedPath = await openDialog({
      filters: [filter]
    });
    if (selectedPath && typeof selectedPath === 'string') {
      return {
        type: "file",
        name: getNameFromPath(selectedPath),
        path: selectedPath,
        children: []
      };
    }
    return undefined;
  },

  async readFile(path: string): Promise<string | undefined> {
    return await readTextFile(path);
  },

  async saveFile(path: string, content: string): Promise<boolean> {
    try {
      await writeTextFile(path, content);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  copyFile: async function (source: string, dest: string): Promise<boolean> {
    try {
      console.log("copy");

      await copyFile(source, dest);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async createDir(path: string): Promise<boolean> {
    try {
      await mkdir(path, { recursive: true });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async createFile(path: string): Promise<boolean> {
    try {
      await this.saveFile(path, "");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async renameDir(oldPath: string, newPath: string): Promise<boolean> {
    // TODO
    try {
      await invoke("rename_dir", { oldPath, newPath });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  async renameFile(oldPath: string, newPath: string): Promise<boolean> {
    try {
      await rename(oldPath, newPath);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  async deleteDir(path: string): Promise<boolean> {
    try {
      await remove(path, { recursive: true });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async deleteFile(path: string): Promise<boolean> {
    try {
      await remove(path);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  exists: async function (path: string): Promise<boolean> {
    return await exists(path);
  },

  async showSaveDialog(): Promise<string | undefined> {
    const selectedPath = await save({
      filters: [{
        name: 'Markdown Document',
        extensions: ['md', 'markdown'],
      }]
    });
    if (selectedPath && typeof selectedPath === 'string') {
      return selectedPath;
    }
    return undefined;
  },

  async getSystemInfo(): Promise<string> {
    return "Hello! This is tauri.";
  },

  async openDevTools(): Promise<void> {
    // TODO
    throw new Error("Method not implemented.");
  },

  win: {
    close: function (): void {
      appWindow.close();
    },
    
    minimize: function (): void {
      appWindow.minimize();
    },

    toggleMaximize: async function () {
      appWindow.toggleMaximize();
    },

    onWillClose: async function (hanlder): Promise<() => void> {
      return appWindow.onCloseRequested(async (event) => {
        const confirmed = await hanlder();
        if (!confirmed) {
          event.preventDefault();
        }
      });
    }
  },

  openInBrowser: async function (url: string): Promise<void> {
    await openIn(url);
  },

  locateFile: function (filePath: string): void {
    console.log("locateFile in sys:", filePath);
    // FIXME Only works for Windows
    if (platform()==='windows') {
      const command = Command.create("locate-file-win", ["/select", filePath]);
      command.execute();
      return
    } else if (platform()==='macos') {
      console.log("locateFile: macOS");
      const command = Command.create("open", [filePath]);
      command.execute();
      return
    } else {
      console.error("locateFile: Unsupported platform:", platform());
    }
  },

  locateFolder: function (folderPath: string): void {
    console.log("locateFolder in sys:", folderPath);
    // FIXME Only works for Windows
    const command = Command.create("locate-folder-win", ["/root", folderPath]);
    command.execute();
  },

  isWindows: function (): boolean {
    return platform() === "windows";
  },

  isMacOS: function (): boolean {
    return platform() === "macos";
  },

  isLinux: function (): boolean {
    return platform() === "linux";
  },

}