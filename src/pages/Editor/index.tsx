import { ReactComponentElement, useEffect, useRef, useState } from "react";
import Vditor from "vditor";
import DirectorySidePanel from "@/components/DirectoryPanel";
import { EditorContextMenu } from "./EditorContextMenu";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import useNavigationStore from "@/store/navigation_state";


let vditor: Vditor;

export function Editor() {
  useEffect(() => {
    const optioins: IOptions = {
      after: () => {
        vditor.setValue("Welcome to Markditor");
      },
      cdn: "./lib",
      height: "100%",
      upload: {
        // TODO 在这里处理外部粘贴的图片
        handler: (files) => {
          vditor.insertValue("![](images.png)")
          return null
        },
      },
      input: (v) => { console.log("input:", v); },
    }

    vditor = new Vditor("vditor", optioins);
  }, []);

  const editorContainer = <div id="vditor" className="vditor overflow-y-auto flex-grow" />

  const showSidePanel = useNavigationStore((state) => state.sidebarExpanded);
  const [panelSize, setPanelSize] = useState(20)
  const onResize = (size: number) => setPanelSize(size)

  return (
    <div className="flex h-full">
      <ResizablePanelGroup direction="horizontal">
        {showSidePanel && (
          <>
            <ResizablePanel id="DirectorySidePanel" order={1}
              defaultSize={panelSize} minSize={15} maxSize={40}
              onResize={onResize}>
              <DirectorySidePanel />
            </ResizablePanel>
            <ResizableHandle id="handle" />
          </>
        )}
        <ResizablePanel id="mainEditor" order={2}>
          <EditorContextMenu vditor={vditor}>
            {editorContainer}
          </EditorContextMenu>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}