import { appWindow, } from '@tauri-apps/api/window'
import { createDir, readDir, removeDir, renameFile, writeTextFile, readTextFile, removeFile, exists } from '@tauri-apps/api/fs';
import { open as openDialog, save } from '@tauri-apps/api/dialog';
import { invoke } from '@tauri-apps/api';
import { CliArgs, IPlatformAPI } from "shared/platform_api";
import { getNameFromPath, isMarkdownFile } from '@/utils/path';
import { open as openIn } from '@tauri-apps/api/shell';
import { getMatches } from '@tauri-apps/api/cli';
import { IFileFilter, markdownFilter } from '@shared/file_filters';
import { platform } from '@tauri-apps/api/os';


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

  async listDirectories(path: string): Promise<DirectoryEntity[]> {
    const entries = await readDir(path);
    const dirs: DirectoryEntity[] = [];
    const files: DirectoryEntity[] = [];
    for (const entry of entries) {
      if (entry.children) {
        dirs.push({
          type: "dir",
          name: entry.name ?? "",
          path: entry.path,
          children: []
        });
      } else {
        if (isMarkdownFile(entry.name ?? "")) {
          files.push({
            type: "file",
            name: entry.name ?? "",
            path: entry.path,
            children: []
          });
        }
      }
    }
    return [...dirs, ...files];
  },

  async selectFile(filter: IFileFilter = markdownFilter): Promise<DirectoryEntity | undefined> {
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
      return false;
    }
  },
  async createDir(path: string): Promise<boolean> {
    try {
      await createDir(path, { recursive: true });
      return true;
    } catch (error) {
      return false;
    }
  },

  async createFile(path: string): Promise<boolean> {
    // TODO
    console.log(path);

    try {
      await this.saveFile(path, "");
      return true;
    } catch (error) {
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
      await renameFile(oldPath, newPath);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  async deleteDir(path: string): Promise<boolean> {
    try {
      await removeDir(path, { recursive: true });
      return true;
    } catch (error) {
      return false;
    }
  },

  async deleteFile(path: string): Promise<boolean> {
    try {
      await removeFile(path);
      return true;
    } catch (error) {
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

  os: {
    readCliArgs: async function (): Promise<CliArgs> {
      const matches = await getMatches()
      console.log("args:", JSON.stringify(matches, null, 2));
      const parsedArgs: CliArgs = {}
      if (matches.args) {
        const args = matches.args
        try {
          parsedArgs.source = args?.source?.value as string ?? ""
        } catch (err) {
          console.error(err);
        }
      }
      return parsedArgs
    },
  }
}