import { create } from 'zustand'

interface NavigationState {
  currentRoute: string,
  sidebarExpanded: boolean,
}

const useNavigationStore = create<NavigationState>(
  () => ({
    currentRoute: '/',
    sidebarExpanded: false,
  })
)

const { setState, getState, subscribe } = useNavigationStore

// -----------------------------------------

export function toggleSidebarExpanded(expand?: boolean) {
  setState((state) => ({ ...state, sidebarExpanded: expand ?? !state.sidebarExpanded }))
}


export default useNavigationStore