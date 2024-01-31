import { create } from 'zustand'

interface PreferenceState {
  themeMode: "light" | "dark" | "system", // Default to "system"
  autoSaveTimeout: number, // Default to 8000 ms
}

const usePreferenceStore = create<PreferenceState>(
  (set) => ({
    themeMode: "system",
    autoSaveTimeout: 8000,

    setThemeMode: (themeMode: "light" | "dark" | "system") =>
      set((state) => ({ ...state, themeMode })),

    setAutoSaveTimeout: (autoSaveTimeout: number) =>
      set((state) => ({ ...state, autoSaveTimeout })),
  })
)

export default usePreferenceStore