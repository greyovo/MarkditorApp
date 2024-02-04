import { Toaster } from "sonner";
import { AsideMenuBar } from "./feat/aside_menu/AsideMenuBar";
import { Editor } from "./feat/editor/Editor";
import { useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./components/ui/resizable";
import { DirectoryPanel } from "./feat/directory_panel/DirectoryPanel";
import useNavigationStore from "./store/navigation";
import { WindowTitleBar } from "./components/title_bar/TitleBar";

const App = () => {
  const showSidePanel = useNavigationStore((state) => state.sidebarExpanded);
  const [panelSize, setPanelSize] = useState(20)
  const onResize = (size: number) => setPanelSize(size)
  const titleBarHeight = "33px";

  return (
    <div className="overflow-clip">
      <div style={{ height: titleBarHeight }}>
        <WindowTitleBar />
      </div>
      <div className="flex" style={{ height: `calc(100vh - ${titleBarHeight})` }} >
        <Toaster position="bottom-right" richColors closeButton />
        {/* 侧边菜单栏 */}
        {/* <AsideMenuBar /> */}
        <ResizablePanelGroup direction="horizontal">
          {showSidePanel && (
            <>
              <ResizablePanel id="DirectorySidePanel" order={1}
                defaultSize={panelSize} minSize={15} maxSize={40}
                onResize={onResize}>
                <DirectoryPanel /> {/* 侧边文件夹栏 */}
              </ResizablePanel>
              <ResizableHandle id="handle" />
            </>
          )}
          <ResizablePanel id="mainEditor" order={2}>
            <Editor /> {/* 编辑器 */}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
};

export default App;
