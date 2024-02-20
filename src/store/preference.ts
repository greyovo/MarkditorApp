import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { editorAction, getVditor } from './editor'
import useDocumentStore from './document'
import useDirectoryStore from './directory'
import { EnvConstants } from '@/utils/constants'

export type PrefThemeMode = "light" | "dark" | "system";

export type RealThemeMode = "light" | "dark";

interface PreferenceState {
  prefThemeMode: PrefThemeMode, // Default to "system"
  autoSaveTimeout: number, // Default to 8000 ms
  autoSave: boolean, // Default to true
  fileHistory: string[], // Path to file
  folderHistory: string[], // Path to folder
  defaultShowToolbar: boolean, // Default to true
}

interface PreferenceComputedState {
  themeMode: () => RealThemeMode,
}

const defaultState: PreferenceState = {
  prefThemeMode: "system",
  autoSaveTimeout: 8000,
  autoSave: true,
  defaultShowToolbar: true,
  fileHistory: [],
  folderHistory: [],
}

const usePreferenceStore = create(
  persist<PreferenceState & PreferenceComputedState>(
    (set, get) => ({
      ...defaultState,

      themeMode: function () {
        if (get().prefThemeMode === "system") {
          return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        }
        return get().prefThemeMode === "light" ? "light" : "dark"
      }
    }),

    { name: 'markditor-pref-storage' },
  )
)

const { setState, getState, subscribe } = usePreferenceStore

class PreferenceActions {
  prefActions(v: boolean): void {
    throw new Error('Method not implemented.')
  }
  public setThemeMode(prefThemeMode: PrefThemeMode) {
    setState((state) => ({ ...state, prefThemeMode }))
    editorAction.syncTheme()
  }

  public appendFileHistory(filePath: string) {
    const history = getState().fileHistory.filter(
      (path, index) => path !== filePath && index < EnvConstants.MAX_HISTORY_LENGTH
    )

    setState((state) => ({ ...state, fileHistory: [filePath, ...history] }))
  }

  public appendFolderHistory(folderPath: string) {
    const history = getState().folderHistory.filter(
      (path, index) => path !== folderPath && index < EnvConstants.MAX_HISTORY_LENGTH
    )
    setState((state) => ({ ...state, folderHistory: [folderPath, ...history] }))
  }

  public clearAllHistory() {
    setState((state) => ({ ...state, fileHistory: [], folderHistory: [] }))
  }

  public setDefaultShowToolbar(defaultShowToolbar: boolean) {
    setState((state) => ({ ...state, defaultShowToolbar }))
  }

  public toggleAutoSave(autoSave: boolean) {
    setState((state) => ({ ...state, autoSave }))
  }

  public toggleDefaultShowToolbar(show: boolean) {
    setState((state) => ({ ...state, defaultShowToolbar: show }))
  }

  public setAutoSaveTimeout(autoSaveTimeout: number) {
    if (autoSaveTimeout < 1000) return
    setState((state) => ({ ...state, autoSaveTimeout }))
  }
}

export function initDirectoryOpenListener() {
  const unsubscribeFile = useDocumentStore.subscribe((state, prevState) => {
    if (state.path !== undefined && state.path !== prevState.path) {
      prefActions.appendFileHistory(state.path)
    }
  })

  const unsubscribeFolder = useDirectoryStore.subscribe((state, prevState) => {
    if (state.root !== undefined && state.root !== prevState.root) {
      prefActions.appendFolderHistory(state.root.path)
    }
  })

  return () => {
    unsubscribeFile()
    unsubscribeFolder()
  }
}

export const prefActions = new PreferenceActions()

export default usePreferenceStore