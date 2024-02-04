import { ReactComponentElement, useEffect, useRef, useState } from "react";
import Vditor from "vditor";
import { DirectoryPanel } from "@/feat/directory_panel/DirectoryPanel";
import { EditorContextMenu } from "./EditorContextMenu";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import useNavigationStore from "@/store/navigation";
import useDocumentStore, { updateContent } from "@/store/document";
import { BottomInfoBar } from "./BottomInfoBar";
import { Constants } from "@/utils/constants";
import useEditorStore, { setVditor } from "@/store/editor";

const _placeHolder = "# Welcome to Markditor \nHello, welcome to `Markditor`.\n# 欢迎使用 Markditor\n你好，欢迎使用 `Markditor`"

export function Editor() {
  useEffect(() => {
    let vditor: Vditor
    // vidtor options
    const optioins: IOptions = {
      undoDelay: 100,
      after: () => {
        setVditor(vditor)
      },
      // cache: {
      //   enable: false
      // },
      cdn: "./lib",
      height: "100%",
      borderless: true,
      toolbarConfig: {
        enable: false
      },
      upload: {
        // TODO 在这里处理外部粘贴的图片
        handler: (files) => {
          vditor.insertValue("![](images.png)")
          return null
        },
      },
      input: (v) => {
        console.log("input length:", v.length);
        updateContent(v)
      },
      preview: {
        hljs: {
          langs: Constants.CODE_LANGUAGES
        }
      }
    }

    vditor = new Vditor("vditor", optioins);

    // 监听新文件打开
    const unsubscribe = useDocumentStore.subscribe((state, prevState) => {
      if (state.path == prevState.path && state.content !== undefined) {
        return
      }
      vditor.setValue(state.content ?? "")
      setTimeout(() => {
        vditor.clearStack()
        vditor.clearCache()
      }, 50);
    })

    return () => {
      setVditor(undefined)
      unsubscribe()
    };
  }, []);

  const editorContainer = <div id="vditor" className="overflow-y-auto flex-grow" />

  return (
    <div className="flex flex-col h-full">
      <EditorContextMenu>
        {editorContainer}
      </EditorContextMenu>
      <BottomInfoBar />
    </div>
  )
}
