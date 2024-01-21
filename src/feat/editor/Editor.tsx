import { ReactComponentElement, useEffect, useRef, useState } from "react";
import Vditor from "vditor";
import { DirectoryPanel } from "@/feat/directoryPanel/DirectoryPanel";
import { EditorContextMenu } from "./EditorContextMenu";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import useNavigationStore from "@/store/navigationStore";
import useDocumentStore from "@/store/documentStore";
import { BottomInfoBar } from "./bottomInfoBar/BottomInfoBar";

const _placeHolder = "# Welcome to Markditor \nHello, welcome to `Markditor`.\n# 欢迎使用 Markditor\n你好，欢迎使用 `Markditor`"

let vditor: Vditor;

export function Editor() {
  useEffect(() => {
    const optioins: IOptions = {
      cache: {
        enable: false,
      },
      after: () => {

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
      input: (v) => {
        console.log("input length:", v.length);
        useDocumentStore.getState().updateContent(v)
      },
    }

    vditor = new Vditor("vditor", optioins);

    // 监听新文件打开
    return useDocumentStore.subscribe((state, prevState) => {
      if (state.path == prevState.path && state.content !== undefined) return

      vditor.setValue(state.content ?? "")
    })
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
              <DirectoryPanel />
            </ResizablePanel>
            <ResizableHandle id="handle" />
          </>
        )}
        <ResizablePanel className="flex flex-col" id="mainEditor" order={2}>
          <EditorContextMenu vditor={vditor}>
            {editorContainer}
          </EditorContextMenu>
          <BottomInfoBar />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}