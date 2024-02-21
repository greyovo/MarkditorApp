import { Editor } from "./feat/editor/Editor";
import { useEffect, useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./components/ui/resizable";
import { DirectoryPanel } from "./feat/directory_panel/DirectoryPanel";
import useNavigationStore from "./store/navigation";
import { WindowTitleBar } from "./feat/title_bar/TitleBar";
import useDocumentStore from "./store/document";
import { Welcome } from "./feat/welcome/Welcome";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "sonner";
import usePreferenceStore from "./store/preference";
import { UnsaveAlertDialog } from "./feat/editor/UnsaveAlertDialog";
import { PlatformAPI } from "@/ipc";
import { openFile, setRootDir } from "@/store/directory";
import { initDirectoryOpenListener } from "@/store/preference";
import { getParentDirectory } from "./utils/path";

async function onAppLaunch() {
  const pathArg = (await PlatformAPI.os.readCliArgs()).source
  if (pathArg) {
    if (await PlatformAPI.exists(pathArg)) {
      openFile(pathArg)
      setRootDir(getParentDirectory(pathArg))
    }
  }
}

let unlistenDirOpen: () => void | undefined

// After DOM is ready
async function onAppReady() {
  registerListeners()
}

function onAppExit() {
  unregisterListeners()
}

function registerListeners(): void {
  unlistenDirOpen = initDirectoryOpenListener()
}

function unregisterListeners(): void {
  unlistenDirOpen?.()
}

export function ThemedApp() {
  // Right after the DOM is ready
  useEffect(() => {
    onAppReady()
    return onAppExit
  }, [])

  const themeMode = usePreferenceStore((state) => state.themeMode())
  return (
    <Theme appearance={themeMode} className={themeMode === "dark" ? "dark" : ""}>
      <App />
      <Toaster position="bottom-right"
        theme={themeMode} closeButton duration={3000} richColors
        toastOptions={{
          actionButtonStyle: {
            background: "transparent",
            color: "transparent",
          },
          cancelButtonStyle: {
            background: "transparent",
            color: "transparent",
          },
        }}
      />

      {/* Global Alert Dialogs */}
      <UnsaveAlertDialog />
      {/* <ThemePanel /> */}
    </Theme>
  )
}

const App = () => {
  const showSidePanel = useNavigationStore((state) => state.sidebarExpanded);
  const [panelSize, setPanelSize] = useState(20)
  const onResize = (size: number) => setPanelSize(size)
  const titleBarHeight = 32;

  const hasDoc = useDocumentStore((state) => state.hasDocOpened());

  return (
    <div>
      <div style={{ height: titleBarHeight }}>
        <WindowTitleBar />
      </div>
      <div className="flex border-t" style={{ height: `calc(100vh - ${titleBarHeight}px)` }} >
        {/* 侧边菜单栏 */}
        <ResizablePanelGroup direction="horizontal">
          {showSidePanel && (
            <>
              <ResizablePanel id="DirectorySidePanel" order={1}
                defaultSize={panelSize} minSize={15} maxSize={45}
                onResize={onResize}>
                <DirectoryPanel /> {/* 侧边文件夹栏 */}
              </ResizablePanel>
              <ResizableHandle style={{ width: 0 }} id="handle" />
            </>
          )}
          <ResizablePanel id="mainEditor" order={2}>
            {/* 右侧主体 */}
            {hasDoc ? <Editor /> : <Welcome />}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
};


onAppLaunch()