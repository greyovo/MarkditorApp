import { PlatformAPI } from "@/ipc"
import { create } from "zustand"
import useDocumentStore from "./documentStore"
import { isMarkdownFile } from "@/utils/filesUtil"

interface DirectoryState {
  currentDoc?: DocumentEntity,
  root?: DirectoryEntity,
  openedDirPath: string[],
}

const useDirectoryStore = create<DirectoryState>(
  (set, get) => ({
    currentDoc: undefined,
    root: undefined,
    openedDirPath: []
  })
)

const { setState, getState, subscribe } = useDirectoryStore

function findTargetDirRecursive
  (children: DirectoryEntity[], targetPath: string): DirectoryEntity | undefined {
  if (!children || children.length === 0) {
    return undefined
  }
  for (const dir of children) {
    if (dir.path === targetPath) {
      return dir
    }
    const targetDir = findTargetDirRecursive(dir.children, targetPath)
    if (targetDir) {
      return targetDir
    }
  }
  return undefined
}

export function setRootDirectory(root: DirectoryEntity) {
  setState((state) => ({ ...state, root, children: root.children }))
}

export async function openDirectory(path: string) {
  try {
    if (getState().root == undefined) {
      console.error("No root dir:", path);
      return
    }

    const dirChildren = await PlatformAPI.listDirectories(path)
    const rootChildren = getState().root?.children || []
    const targetDir = findTargetDirRecursive(rootChildren, path)

    if (!targetDir) {
      console.error("Cannot found dir:", path);
      return
    }
    targetDir.children = dirChildren

    const newRoot: DirectoryEntity = {
      ...getState().root!,
      children: rootChildren,
    }
    console.log(path, "children:", dirChildren);

    setState((s) => ({ ...s, root: newRoot, openedDirPath: [...s.openedDirPath, path] }))
  } catch (e) {
    console.error('Error fetching directory', e);
  }
}

export async function openFile(path: string) {
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



export default useDirectoryStore