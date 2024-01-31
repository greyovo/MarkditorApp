import { Toaster } from "sonner";
import { AsideMenuBar } from "./feat/aside_menu/AsideMenuBar";
import { Editor } from "./feat/editor/Editor";
import { useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./components/ui/resizable";
import { DirectoryPanel } from "./feat/directory_panel/DirectoryPanel";
import useNavigationStore from "./store/navigation";


const App = () => {
  const showSidePanel = useNavigationStore((state) => state.sidebarExpanded);
  const [panelSize, setPanelSize] = useState(20)
  const onResize = (size: number) => setPanelSize(size)

  return (
    <div className="flex" style={{ height: "100vh" }}>
      <Toaster position="bottom-right" richColors closeButton />
      {/* 侧边菜单栏 */}
      <AsideMenuBar />
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
  )
};

export default App;
