import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { getVditor, syncEditorTheme } from './editor'

interface PreferenceState {
  prefThemeMode: "light" | "dark" | "system", // Default to "system"
  autoSaveTimeout: number, // Default to 8000 ms
  fileHistory: string[], // Path to file
  folderHistory: string[], // Path to folder

  // Computed
  themeMode: () => "light" | "dark",
}

const usePreferenceStore = create(
  persist<PreferenceState>(
    (set, get) => ({
      prefThemeMode: "system",
      autoSaveTimeout: 8000,
      fileHistory: [],
      folderHistory: [],

      themeMode() {
        if (get().prefThemeMode === "system") {
          return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        }
        return get().prefThemeMode === "light" ? "light" : "dark"
      }
    }),

    {
      name: 'markditor-pref-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  )
)

const { setState, getState, subscribe } = usePreferenceStore


export function setThemeMode(prefThemeMode: "light" | "dark" | "system") {
  setState((state) => ({ ...state, prefThemeMode }))
  const realThemeMode = getState().themeMode()
  syncEditorTheme()
}


function setAutoSaveTimeout(autoSaveTimeout: number) {
  setState((state) => ({ ...state, autoSaveTimeout }))
}


export default usePreferenceStore