import { PlatformAPI } from '@/ipc'
import { create } from 'zustand'


interface DocumentState {
  content?: string,
  path?: string,
  saved: boolean,

  updateContent: (text: string) => void,
  setFile: (path: string, content: string) => void,
  // createFile: () => void,
  // closeFile: () => void,
  saveFile: () => void,
  markAsDirty: () => void,
  closeFile: () => void,
}

const initialState: DocumentState = {
  content: undefined,
  path: undefined,
  saved: false,
  markAsDirty: () => { },
  closeFile: () => { },
  saveFile: () => { },
  setFile: () => { },
  updateContent: () => { },
}

const useDocumentStore = create<DocumentState>(
  (set) => ({
    ...initialState,

    updateContent: (content: string) =>
      set((state) => ({ ...state, content })),

    setFile: (path: string, content: string) =>
      set((state) => ({ ...state, content, path })),

    saveFile: function () {
      set((state) => {
        PlatformAPI.saveFile(state.path!, state.content!)
        return ({ ...state, saved: true })
      })
    },

    markAsDirty: () => set((state) => ({ ...state, saved: false })),

    closeFile: () => set((state) => ({ ...initialState })),
  })
)

const { getState, setState, subscribe } = useDocumentStore

export default useDocumentStore