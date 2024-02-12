import { create } from 'zustand'
import { getVditor } from './editor'

interface PreferenceState {
  prefThemeMode: "light" | "dark" | "system", // Default to "system"
  autoSaveTimeout: number, // Default to 8000 ms
  // Computed
  themeMode: () => "light" | "dark",
}

const usePreferenceStore = create<PreferenceState>(
  (set, get) => ({
    prefThemeMode: "system",
    autoSaveTimeout: 8000,

    themeMode() {
      if (get().prefThemeMode === "system") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      }
      return get().prefThemeMode === "light" ? "light" : "dark"
    }
  })
)

const { setState, getState, subscribe } = usePreferenceStore


export function setThemeMode(prefThemeMode: "light" | "dark" | "system") {
  setState((state) => ({ ...state, prefThemeMode }))
  const realThemeMode = getState().themeMode()
  const editorTheme = realThemeMode === "light" ? "classic" : "dark"
  getVditor()?.setTheme(editorTheme, realThemeMode)
}


function setAutoSaveTimeout(autoSaveTimeout: number) {
  setState((state) => ({ ...state, autoSaveTimeout }))
}


export default usePreferenceStore