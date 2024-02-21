import { create } from 'zustand'
import useDocumentStore from './document'

export interface UnsaveAlertProps {
  visible: boolean
  doNext?: () => void | Promise<void>
}

const initialDialogState = {
  createDialog: false,
  unsaveAlert: {
    visible: false,
    doNext: () => { }
  } as UnsaveAlertProps,
}

const useDialogStore =
  create<typeof initialDialogState>(
    () => initialDialogState
  )

const { setState, getState } = useDialogStore

// -----------------------------------------

class DialogActions {

  public showUnsaveAlertIfNeeded = ({ doNext }: { doNext: () => void }) => {
    if (useDocumentStore.getState().shouldAlertSave()) {
      setState((state) => ({
        ...state,
        unsaveAlert: { visible: true, doNext, }
      }))
    } else {
      doNext()
    }
  }

  public hideUnsaveAlert = () => {
    setState((state) => ({
      ...state,
      unsaveAlert: { visible: false, doNext: () => { }, }
    }))
  }

}

export const dialogActions = new DialogActions()

export default useDialogStore

