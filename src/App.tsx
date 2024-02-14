import { Editor } from "./feat/editor/Editor";
import { useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./components/ui/resizable";
import { DirectoryPanel } from "./feat/directory_panel/DirectoryPanel";
import useNavigationStore from "./store/navigation";
import { WindowTitleBar } from "./feat/title_bar/TitleBar";
import useDocumentStore from "./store/document";
import { Welcome } from "./feat/welcome/Welcome";
import { Dialog } from "@radix-ui/react-dialog";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "sonner";
import { DialogProvider } from "./components/dialog/DialogContext";
import usePreferenceStore from "./store/preference";
import { openFile, setRootDir } from "./store/directory";
import { Constants } from "./utils/constants";
import { PlatformAPI } from "./ipc";
import { getParentDirectory } from "./utils/path";

export function ThemedApp() {
  // const themeMode = "dark" // usePreferenceStore(state => state.themeMode)
  const themeMode = usePreferenceStore((state) => state.themeMode())
  return (
    <Theme appearance={themeMode} className={themeMode === "dark" ? "dark" : ""}>
      <DialogProvider>
        <App />
        <Dialog />
        <Toaster position="bottom-right" className='-mr-5'
          theme={themeMode} richColors closeButton duration={3000} />
      </DialogProvider>
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
    <div className="overflow-clip">
      <div style={{ height: titleBarHeight }}>
        <WindowTitleBar />
      </div>
      <div className="flex border-t" style={{ height: `calc(100vh - ${titleBarHeight}px)` }} >
        {/* 侧边菜单栏 */}
        {/* <AsideMenuBar /> */}
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

async function initApp() {
  const defaultFilePath = (await PlatformAPI.os.readCliArgs()).source
  if (defaultFilePath) {
    if (await PlatformAPI.exists(defaultFilePath)) {
      openFile(defaultFilePath)
      setRootDir(getParentDirectory(defaultFilePath))
    }
  }
}

initApp()