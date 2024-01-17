import { create } from 'zustand'

interface NavigationState {
  currentRoute: string,

  sidebarExpanded: boolean,
  toggleSidebarExpanded: () => void,
  // expandSidebar: () => void,
  // collapseSidebar: () => void,
}

const useNavigationStore = create<NavigationState>(
  (set) => ({
    currentRoute: '/',

    sidebarExpanded: true,
    toggleSidebarExpanded: () => set((state) => ({ ...state, sidebarExpanded: !state.sidebarExpanded })),
    // expandSidebar: () => set((state) => ({ directorySidebarExpanded: true })),
    // collapseSidebar: () => set((state) => ({ directorySidebarExpanded: false })),
  })
)

const { getState, setState, subscribe } = useNavigationStore

export default useNavigationStore