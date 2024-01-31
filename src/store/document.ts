import { PlatformAPI } from '@/ipc'
import { getFileNameFromPath } from '@/utils/filesUtil'
import { setWindowTitle } from '@/utils/windowUtils'
import { create } from 'zustand'


interface DocumentState {
  content?: string,
  path?: string,
  saved: boolean,
  fileName?: string,

  // updateContent: (text: string) => void,
  // setFile: (path: string, content: string) => void,
  // createNewFile: () => void,
  // // closeFile: () => void,
  // saveFile: () => void,
  // // markAsDirty: () => void,
  // closeFile: () => void,
}


const useDocumentStore = create<DocumentState>(
  () => ({
    content: undefined,
    path: undefined,
    fileName: undefined,
    saved: false,
  }),
)

const { setState, getState, subscribe } = useDocumentStore

// -----------------------------------------

export function createNewFile() {
  const fileName = "Untitled.md"
  setState(state => ({
    ...state,
    content: undefined,
    path: undefined,
    fileName: fileName,
    saved: false,
  }))
  setWindowTitle(fileName + "*")
}

export function updateContent(content: string) {
  console.log("updateContent!");
  setState(state => ({ ...state, content, saved: false }))
  setWindowTitle((getState().fileName ?? "Untitled.md") + "*")
}

export function setFile(path: string, content: string) {
  const fileName = getFileNameFromPath(path)
  setState(state => ({
    ...state,
    content,
    path,
    fileName,
    saved: true
  }))
  setWindowTitle(fileName)
}

export async function saveFile() {
  let path = getState().path
  if (path === undefined) {
    path = await PlatformAPI.showSaveDialog()
    if (!path) return
  }
  await PlatformAPI.saveFile(path!, getState().content!)
  const fileName = getFileNameFromPath(path)
  setState(state => ({
    ...state,
    path,
    saved: true,
    fileName,
  }))
  setWindowTitle(fileName)
}

// markAsDirty: () => set((state) => ({ ...state, saved: false })),

function closeFile() {
  setState(state => ({
    content: undefined,
    path: undefined,
    fileName: undefined,
    saved: false,
  }))
  setWindowTitle("")
}

export default useDocumentStore