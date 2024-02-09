import { PlatformAPI } from "@/ipc"
import { create } from "zustand"
import useDocumentStore, { closeCurrentDoc, closeDocIfNotExist, setFile } from "./document"
import { findTargetDirRecursive, getDirectoryFromPath, getNameFromPath, getParentDirectory, isMarkdownFile } from "@/utils/path"
import useNavigationStore from "./navigation"

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
  // useDocumentStore.subscribe(async (state, prev) => {
  //   if (state.hasDocOpened()) {
  //     setRootDir(getDirectoryFromPath(state.baseDir))
  //   }
  // })
}

// -----------------------------------------

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
    closeCurrentDoc()
    useNavigationStore.setState((state) => ({ ...state, sidebarExpanded: true }))
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

export async function selectFile() {
  const file = await PlatformAPI.selectFile()
  if (file !== undefined) {
    const content = await PlatformAPI.readFile(file.path)
    if (content === undefined) {
      throw Error("Failed to read file")
    }
    setFile(file.path, content)
    setRootDir(getParentDirectory(file.path))
  }
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

export async function refreshDirectory(dir: DirectoryEntity) {
  if (dir.path === getState().root!.path) {
    refreshRootDir()
  } else {
    openDirectory(dir.path)
  }
}

export async function createDirectory(base: DirectoryEntity, name: string): Promise<boolean> {
  let target = base.path + "/" + name
  const exist = await PlatformAPI.exists(target)
  if (exist) {
    console.error("已存在目录或文件：", target);
    return false
  }
  const res = await PlatformAPI.createDir(target)
  refreshDirectory(base)
  return res
}

export async function createFile(base: DirectoryEntity, name: string): Promise<boolean> {
  if (!isMarkdownFile(name)) {
    name += ".md"
  }
  let target = base.path + "/" + name
  const exist = await PlatformAPI.exists(target)
  if (exist) {
    console.error("已存在目录或文件：", target);
    return false
  }
  const res = await PlatformAPI.createFile(target)
  refreshDirectory(base)
  return res
}

export async function renameFile(entity: DirectoryEntity, newName: string) {
  const parent = getParentDirectory(entity.path)
  const res = await PlatformAPI.renameFile(entity.path, parent.path + "/" + newName)
  if (res) {
    refreshDirectory(parent)
  }
  return res
}

export async function renameDirectory(entity: DirectoryEntity, newName: string) {
  const parent = getParentDirectory(entity.path)
  const res = await PlatformAPI.renameDir(entity.path, parent.path + "/" + newName)
  if (res) {
    refreshDirectory(parent)
  }
  return res
}

export async function deleteDirectory(entity: DirectoryEntity) {
  const res = await PlatformAPI.deleteDir(entity.path)
  if (res) {
    refreshDirectory(getParentDirectory(entity.path))
    closeDocIfNotExist()
  }
  return res
}

export async function deleteFile(entity: DirectoryEntity) {
  const res = await PlatformAPI.deleteFile(entity.path)
  if (res) {
    refreshDirectory(getParentDirectory(entity.path))
    closeDocIfNotExist()
  }
  return res
}




export default useDirectoryStore