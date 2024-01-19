import { create } from 'zustand'

interface PreferenceStore {
  themeMode: "light" | "dark" | "system", // Default to "system"
  autoSaveTimeout: number, // Default to 8000 ms
}

const useNavigationStore = create<PreferenceStore>(
  (set) => ({
    themeMode: "system",
    autoSaveTimeout: 8000,

    setThemeMode: (themeMode: "light" | "dark" | "system") =>
      set((state) => ({ ...state, themeMode })),

    setAutoSaveTimeout: (autoSaveTimeout: number) =>
      set((state) => ({ ...state, autoSaveTimeout })),
  })
)

const { getState, setState, subscribe } = useNavigationStore

export default useNavigationStore