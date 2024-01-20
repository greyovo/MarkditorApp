import { PlatformAPI } from "@/ipc"
import { create } from "zustand"
import useDocumentStore from "./documentStore"
import { isMarkdownFile } from "@/utils/filesUtil"

interface DirectoryState {
  currentDoc?: DocumentEntity,
  root?: DirectoryEntity,
  children: (DirectoryEntity)[],

  setRootDirectory: (root: DirectoryEntity) => void,
  openDirectory: (path: string) => void,
  openFile: (path: string) => void,
  // expandSidebar: () => void,
  // collapseSidebar: () => void,
}

const useDirectoryStore = create<DirectoryState>(
  (set, get) => ({
    currentDoc: undefined,
    root: undefined,
    children: [],

    setRootDirectory(root) {
      set((state) => ({ ...state, root, children: root.children }))
    },

    async openDirectory(path: string) {
      try {
        const res = await PlatformAPI.listDirectories(path)
        const idx = get().children.findIndex((d) => d.path === path)
        if (idx === -1) {
          return
        }
        const targetDir = get().children[idx]
        if (targetDir.type !== "dir") {
          return
        }

        const updatedDir = { ...targetDir, children: res }
        set((s) => ({ ...s, children: get().children.with(idx, updatedDir) }))
      } catch (e) {
        console.error('Error fetching directory');
      }
    },

    async openFile(path: string) {
      if (!isMarkdownFile(path)) {
        return
      }
      const content = await PlatformAPI.readFile(path)
      if (content === undefined) {
        console.error("Error when reading file via IPC:", path);
        return
      }
      useDocumentStore.getState().setFile(path, content)
    }
  })
)

export default useDirectoryStore