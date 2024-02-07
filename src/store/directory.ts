import { PlatformAPI } from "@/ipc"
import { create } from "zustand"
import useDocumentStore, { closeDocIfNotExist, setFile } from "./document"
import { getParentDirectory, isMarkdownFile } from "@/utils/path"

interface DirectoryState {
  root?: DirectoryEntity,
}

const useDirectoryStore = create<DirectoryState>(
  () => ({
    root: undefined,
  })
)

const { setState, getState, subscribe } = useDirectoryStore

export const initDirectoryStore = () => {
  useDocumentStore.subscribe((state, prev) => {
    if (state.path) {
      setRootDir(getParentDirectory(state.path))
    }
  })
}

// -----------------------------------------

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

export async function setRootDir(root: DirectoryEntity) {
  const children = (await PlatformAPI.listDirectories(root.path))
  root.children = children
  setState((state) => ({ ...state, root }))
}

export async function selectRootDir() {
  const root = (await PlatformAPI.selectDirectory())
  if (root !== undefined) {
    setState((state) => ({ ...state, root, children: root.children }))
    console.log(root);
  } else {
    console.log("打开文件失败！");
  }
}

export async function refreshRootDir() {
  if (getState().root === undefined)
    return
  // refresh children dir
  const children = (await PlatformAPI.listDirectories(getState().root!.path))
  const newRoot = {
    ...getState().root!, children,
  }
  setState((state) => ({ ...state, root: newRoot }))
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

    setState((s) => ({ ...s, root: newRoot }))
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
  setFile(path, content)
}

export async function renameFile(entity: DirectoryEntity, newName: string) {
  const parent = getParentDirectory(entity.path)
  await PlatformAPI.renameFile(entity.path, parent + "/" + newName)
  refreshRootDir()
}

export async function renameDirectory(entity: DirectoryEntity, newName: string) {
  const parent = getParentDirectory(entity.path)
  await PlatformAPI.renameFile(entity.path, parent + "/" + newName)
  refreshRootDir()
}

export async function deleteDirectory(entity: DirectoryEntity) {
  await PlatformAPI.deleteDir(entity.path)
  refreshRootDir()
  closeDocIfNotExist()
}

export async function deleteFile(entity: DirectoryEntity) {
  await PlatformAPI.deleteFile(entity.path)
  refreshRootDir()
  closeDocIfNotExist()
}


export default useDirectoryStore