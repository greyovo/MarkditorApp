import { PlatformAPI } from "@/ipc"
import { create } from "zustand"
import useDocumentStore from "./documentStore"

interface DirectoryState {
  currentDoc?: DocumentEntity,
  root?: DirectoryEntity,
  children: (DirectoryEntity)[],
  openDirectory: (path: string) => void,
  openFile: (path: string) => void,
  // expandSidebar: () => void,
  // collapseSidebar: () => void,
}

const useDirectoryStore = create<DirectoryState>(
  (set) => ({
    currentDoc: undefined,
    root: undefined,
    children: [],

    async openDirectory(path: string) {
      try {
        const res = await PlatformAPI.listDirectories(path)
        const idx = this.children.findIndex((d) => d.path === path)
        if (idx === -1) {
          return
        }
        const targetDir = this.children[idx]
        if (targetDir.type !== "dir") {
          return
        }

        const updatedDir = { ...targetDir, children: res }
        set((s) => ({ ...s, children: this.children.with(idx, updatedDir) }))
      } catch (e) {
        console.error('Error fetching directory');
      }
    },

    async openFile(path: string) {
      const content = await PlatformAPI.readFile(path)
      if (content === undefined) {
        console.error("Error when reading file via IPC:", path);
        return
      }
      useDocumentStore.getState().setFile(path, content)

    }
  })
)

const { getState, setState, subscribe } = useDirectoryStore

export default useDirectoryStore