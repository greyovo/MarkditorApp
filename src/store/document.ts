import { PlatformAPI } from '@/ipc'
import { getNameFromPath, getParentDirectory } from '@/utils/path'
import { create } from 'zustand'
import { setRootDir } from './directory'
import { stat } from 'fs'


interface DocumentState {
  content?: string,
  path?: string,
  baseDir?: string,
  saved: boolean,
  fileName?: string,
}

const useDocumentStore = create<DocumentState>(
  () => ({
    content: undefined,
    path: undefined,
    baseDir: undefined,
    fileName: undefined,
    saved: false,
  }),
)

const { setState, getState, subscribe } = useDocumentStore

// -----------------------------------------
function resetDocState() {
  setState(state => ({
    content: undefined,
    path: undefined,
    baseDir: undefined,
    fileName: "",
    saved: false,
  }))
}

export function createNewDoc() {
  setState(state => ({
    content: "",
    path: undefined,
    baseDir: undefined,
    fileName: "Untitled.md",
    saved: false,
  }))
}

export async function closeDocIfNeeded() {
  if (getState().path !== undefined) {
    if (!await PlatformAPI.exists(getState().path!)) {
      resetDocState()
    }
  }
}

export function updateContent(content: string) {
  console.log("updateContent!");
  setState(state => ({ ...state, content, saved: false }))
}

export function setFile(path: string, content: string) {
  const fileName = getNameFromPath(path)
  const baseDir = getParentDirectory(path).path
  setState(state => ({
    ...state,
    content,
    baseDir,
    path,
    fileName,
    saved: true
  }))
}

export async function saveFile(): Promise<boolean> {
  let path = getState().path
  if (path === undefined) {
    path = await PlatformAPI.showSaveDialog()
    if (!path) return false
  }
  const success = await PlatformAPI.saveFile(path!, getState().content!)
  if (success) {
    const fileName = getNameFromPath(path)
    const baseDir = getParentDirectory(path).path
    setState(state => ({
      ...state,
      path,
      baseDir,
      saved: true,
      fileName,
    }))
    setRootDir(getParentDirectory(path))
    return true
  } else {
    return false
  }
}

// markAsDirty: () => set((state) => ({ ...state, saved: false })),



export default useDocumentStore