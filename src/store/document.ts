import { PlatformAPI } from '@/ipc'
import { getNameFromPath, getParentDirectory } from '@/utils/path'
import { create } from 'zustand'
import useDirectoryStore, { openDirectory, refreshDirectory, setRootDir } from './directory'

type DocumentState = {
  content?: string,
  path?: string,
  baseDir?: string,
  saved: boolean,
  fileName?: string,
  // computed
  hasDocOpened: () => boolean,
  shouldAlertSave: () => boolean,
}

const useDocumentStore = create<DocumentState>(
  (set, get) => ({
    content: undefined,
    path: undefined,
    baseDir: undefined,
    fileName: undefined,
    saved: false,

    // computed
    hasDocOpened() { return !!get().fileName },
    shouldAlertSave() {
      return get().hasDocOpened() && !get().saved
    }
    // get hasDoc: () => !!get().content,
  }),
)

const { setState, getState, subscribe } = useDocumentStore

// -----------------------------------------

function resetDocState() {
  setState(state => ({
    content: undefined,
    path: undefined,
    baseDir: undefined,
    fileName: undefined,
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

export async function closeDocIfNotExist() {
  if (getState().path !== undefined) {
    if (!await PlatformAPI.exists(getState().path!)) {
      resetDocState()
    }
  }
}

export async function closeCurrentDoc() {
  resetDocState()
}

export function updateContent(content: string) {
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

export async function saveDocument(force?: boolean): Promise<boolean> {
  if (!force && getState().saved) {
    return true
  }

  let path = getState().path
  if (path === undefined) {
    path = await PlatformAPI.showSaveDialog()
    if (!path) return false
  }
  
  try {
    await PlatformAPI.saveFile(path!, getState().content!)
    const fileName = getNameFromPath(path)
    const baseDir = getParentDirectory(path).path
    setState(state => ({
      ...state,
      path,
      baseDir,
      saved: true,
      fileName,
    }))
    if (useDirectoryStore.getState().root === undefined) {
      setRootDir(getParentDirectory(path))
    }
    return true
  } catch (e) {
    throw e
  }

}

// markAsDirty: () => set((state) => ({ ...state, saved: false })),

export default useDocumentStore