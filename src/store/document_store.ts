import { create } from 'zustand'


interface DocumentState {
  content?: string,
  path?: string,
  saved: boolean
}

const useDocumentStore = create<DocumentState>(
  (set) => ({
    content: undefined,
    path: undefined,
    saved: false,

    openFile() {
      
    },

    createFile() {

    },

    closeFile() {

    },

    saveFile() {

    },
  })
)

const { getState, setState, subscribe } = useDocumentStore

export default useDocumentStore