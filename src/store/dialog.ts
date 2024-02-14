import { create } from 'zustand'

export interface UnsaveAlertProps {
  visible: boolean
  doNext?: () => void
}

const initialDialogState = {
  createDialog: false,
  unsaveAlert: {
    visible: false,
    doNext: () => { }
  } as UnsaveAlertProps,
  // relaunchAlert: false,
}

const useDialogStore =
  create<typeof initialDialogState>(
    () => initialDialogState
  )

const { setState, getState } = useDialogStore

// -----------------------------------------

class DialogActions {

  public toggleCreateDialog = (vis: boolean) => {
    setState((state) => ({ ...state, createDialog: vis }))
  }

  public toggleUnsaveAlert = (visible: boolean, doNext?: () => void) => {
    setState((state) => ({
      ...state,
      unsaveAlert: { visible, doNext, }
    }))
  }


  // public toggleRelaunchAlert = (vis: boolean) => {
  //   setState((state) => ({ ...state, relaunchAlert: vis }))
  // }

}

export const dialogActions = new DialogActions()

export default useDialogStore

