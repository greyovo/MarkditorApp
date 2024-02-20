import { PlatformAPI } from "@/ipc"
import { create } from "zustand"
import { closeCurrentDoc, closeDocIfNotExist, setDocument } from "./document"
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

// -----------------------------------------

export async function setRootDir(root: DirectoryEntity) {
  if (root.path === getState().root?.path) return

  const children = (await PlatformAPI.listDirectories(root.path))
  root.children = children
  setState((state) => ({ ...state, root }))
}

export async function setRootDirByPath(path: string) {
  if (path === getState().root?.path) return

  const root = getDirectoryFromPath(path)
  const children = (await PlatformAPI.listDirectories(root.path))
  root.children = children
  setState((state) => ({ ...state, root }))
  closeCurrentDoc()
}

export async function setFileByPath(path: string) {
  if (path !== undefined) {
    const content = await PlatformAPI.readFile(path)
    if (content === undefined) {
      throw Error("setFileByPath: Failed to read file: " + path)
    }
    setDocument(path, content)
    setRootDir(getParentDirectory(path))
  }
}

export async function selectRootDir() {
  const root = (await PlatformAPI.selectDirectory())
  if (root !== undefined) {
    setState((state) => ({ ...state, root, children: root.children }))
    console.log("selectRootDir", root);
    closeCurrentDoc()
    useNavigationStore.setState((state) => ({ ...state, sidebarExpanded: true }))
  } else {
    console.error("selectRootDir:", "打开文件夹失败！");
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
      throw Error("selectFile: Failed to read file: " + file.path)
    }
    setDocument(file.path, content)
    setRootDir(getParentDirectory(file.path))
  }
}

export async function copyFileInPlace(path: string): Promise<string | undefined> {
  const parent = getParentDirectory(path)
  const cpoiedFile = `${getNameFromPath(path, false)} - copy.md`
  const res = await PlatformAPI.copyFile(path, `${parent.path}/${cpoiedFile}`)
  if (res) {
    refreshDirectory(getParentDirectory(path))
    return cpoiedFile
  }
  return undefined
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
  setDocument(path, content)
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