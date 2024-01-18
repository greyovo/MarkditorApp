import { PlatformAPI } from '@/ipc'
import { getFileNameFromPath } from '@/utils/filesUtil'
import { create } from 'zustand'


interface DocumentState {
  content?: string,
  path?: string,
  saved: boolean,
  fileName?: string,

  updateContent: (text: string) => void,
  setFile: (path: string, content: string) => void,
  // createFile: () => void,
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

    updateContent: function (content: string) {
      set(state => ({ ...state, content, saved: false }))
    },

    setFile: function (path: string, content: string) {
      set(state => ({
        ...state,
        content,
        path,
        fileName: getFileNameFromPath(path),
        saved: false
      }))
    },

    saveFile: async function () {
      let path = this.path
      if (!path) {
        path = await PlatformAPI.showSaveDialog()
        if (!path) return
      }
      await PlatformAPI.saveFile(this.path!, this.content!)
      set(state => ({
        ...state,
        path,
        saved: true,
        fileName: getFileNameFromPath(path)
      }))
    },

    // markAsDirty: () => set((state) => ({ ...state, saved: false })),

    closeFile: function () {
      set(state => ({
        content: undefined,
        path: undefined,
        fileName: undefined,
        saved: false,
      }))
    },
  })
)

const { getState, setState, subscribe } = useDocumentStore

export default useDocumentStore