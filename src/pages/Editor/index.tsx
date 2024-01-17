import { ReactComponentElement, useEffect, useRef, useState } from "react";
import Vditor from "vditor";
import DirectorySidePanel from "@/components/DirectoryPanel";
import { EditorContextMenu } from "./EditorContextMenu";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import useNavigationStore from "@/store/navigation_store";
import { getMarkdownExample } from "./getMarkdownExample";
import useDocumentStore from "@/store/document_store";


let vditor: Vditor;

export function Editor() {
  useEffect(() => {
    const optioins: IOptions = {
      cache: {
        id: "editor",
        enable: false
      },
      after: () => {
        vditor.setValue("Hello 你好")
        // getMarkdownExample().then((v) => {
        //   vditor.setValue(v)
        // })
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

    // 监听文件打开的改变
    const unsubscribe = useDocumentStore.subscribe((state, prevState) => {
      if (state.path != prevState.path) {
        console.log("打开了文件：", state.path);
        console.log(state.content);
        vditor.setValue(state.content ?? "")
      }
    })
    return unsubscribe
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