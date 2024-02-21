import { PlatformAPI } from '@/ipc'
import { getNameFromPath, getParentDirectory } from '@/utils/path'
import { create } from 'zustand'
import useDirectoryStore, { openDirectory, refreshDirectory, setRootDir } from './directory'
import usePreferenceStore from './preference'

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

const initialDocumentState = {
  content: undefined,
  path: undefined,
  baseDir: undefined,
  fileName: undefined,
  saved: true,
}

const useDocumentStore = create<DocumentState>(
  (set, get) => ({
    ...initialDocumentState,

    // computed
    hasDocOpened() { return !!get().fileName },
    shouldAlertSave() {
      return (get().hasDocOpened() && !get().saved) ||
        (get().content !== undefined && get().path === undefined)
    }
    // get hasDoc: () => !!get().content,
  }),
)

const { setState, getState, subscribe } = useDocumentStore

// -----------------------------------------

function resetDocState() {
  setState(state => ({ ...initialDocumentState }))
  cancelAutoSaveInterval()
}

export function createNewDoc() {
  setState(state => ({
    content: undefined,
    path: undefined,
    baseDir: undefined,
    fileName: "Untitled.md",
    saved: true,
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

export function setDocument(path: string, content: string) {
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
  cancelAutoSaveInterval()
  startAutoSaveInterval()
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

// ---------------- AUTO SAVE ----------------

let autoSaveIntervalId: any | undefined

function startAutoSaveInterval() {
  const enabled = usePreferenceStore.getState().autoSave
  if (!enabled) {
    cancelAutoSaveInterval()
    return
  }

  const interval = usePreferenceStore.getState().autoSaveInerval
  autoSaveIntervalId = setInterval(() => {
    console.log("Auto save in every", interval, "ms");
    saveDocument()
  }, interval)
}

function cancelAutoSaveInterval() {
  if (autoSaveIntervalId !== undefined) {
    clearInterval(autoSaveIntervalId)
    autoSaveIntervalId = undefined
  }
}

// markAsDirty: () => set((state) => ({ ...state, saved: false })),

export default useDocumentStore