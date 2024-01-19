import { PlatformAPI } from '@/ipc'
import { getFileNameFromPath } from '@/utils/filesUtil'
import { setWindowTitle } from '@/utils/windowUtils'
import { create } from 'zustand'


interface DocumentState {
  content?: string,
  path?: string,
  saved: boolean,
  fileName?: string,

  updateContent: (text: string) => void,
  setFile: (path: string, content: string) => void,
  createNewFile: () => void,
  // closeFile: () => void,
  saveFile: () => void,
  // markAsDirty: () => void,
  closeFile: () => void,
}


const useDocumentStore = create<DocumentState>(
  (set) => ({
    content: undefined,
    path: undefined,
    fileName: undefined,
    saved: false,

    createNewFile() {
      const fileName = "Untitled.md"
      set(state => ({
        ...state,
        content: undefined,
        path: undefined,
        fileName: fileName,
        saved: false,
      }))
      setWindowTitle(fileName + "*")
    },

    updateContent: function (content: string) {
      console.log("updateContent!");
      set(state => ({ ...state, content, saved: false }))
      setWindowTitle((this.fileName ?? "Untitled.md") + "*")
    },

    setFile: function (path: string, content: string) {
      const fileName = getFileNameFromPath(path)
      set(state => ({
        ...state,
        content,
        path,
        fileName,
        saved: true
      }))
      setWindowTitle(fileName)
    },

    saveFile: async function () {
      let path = this.path
      if (!path) {
        path = await PlatformAPI.showSaveDialog()
        if (!path) return
      }
      await PlatformAPI.saveFile(this.path!, this.content!)
      const fileName = getFileNameFromPath(path)
      set(state => ({
        ...state,
        path,
        saved: true,
        fileName,
      }))
      setWindowTitle(fileName)
    },

    // markAsDirty: () => set((state) => ({ ...state, saved: false })),

    closeFile: function () {
      set(state => ({
        content: undefined,
        path: undefined,
        fileName: undefined,
        saved: false,
      }))
      setWindowTitle("")
    },
  }),
)

const { getState, setState, subscribe } = useDocumentStore

export default useDocumentStore