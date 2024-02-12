import { ReactComponentElement, createElement, useEffect, useRef, useState } from "react";
import Vditor from "vditor";
import { EditorContextMenu } from "./EditorContextMenu";
import useDocumentStore, { updateContent } from "@/store/document";
import { BottomInfoBar } from "./BottomInfoBar";
import { Constants } from "@/utils/constants";
import useEditorStore, { editorAction, getVditor } from "@/store/editor";
import { convertImagePath } from "@/utils/path";
import usePreferenceStore from "@/store/preference";

// const _placeHolder = "# Welcome to Markditor \nHello, welcome to `Markditor`.\n# 欢迎使用 Markditor\n你好，欢迎使用 `Markditor`"
const _placeHolder = "在此开始记录..."

export function Editor() {
  const themeMode = usePreferenceStore(s => s.themeMode())

  useEffect(() => {
    let vditor: Vditor
    // vidtor options
    const optioins: IOptions = {
      undoDelay: 100,
      after: () => {
        // TODO 显示上次关闭时未保存的内容？
        // 是则 updateContent，否则设置空串
        const content = useDocumentStore.getState().content
        vditor.setValue(content ?? "")
        // updateContent(vditor.getValue())
        editorAction.initVditor(vditor)
      },
      placeholder: _placeHolder,
      cdn: "./lib",
      height: "100%",
      borderless: true,
      toolbarConfig: {
        enable: false
      },
      theme: themeMode === "light" ? "classic" : "dark",
      cache: {
        enable: false
      },
      hooks: {
        ir: {
          after: (html) =>
            convertImagePath(html, useDocumentStore.getState().baseDir ?? "")
        },
        sv: {
          after: (html) =>
            convertImagePath(html, useDocumentStore.getState().baseDir ?? "")
        }
      },
      upload: {
        // TODO 在这里处理外部粘贴的图片
        handler: (files) => {
          files.forEach(file => {
            vditor.insertValue(`![${file.path}](images.png)`)
          })
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
      if (state.path === prevState.path && state.content !== undefined) {
        return
      }
      const instance = getVditor()
      console.log("new file opened:", state.path);
      instance?.setValue(state.content ?? "")
      setTimeout(() => {
        instance?.clearStack()
        instance?.clearCache()
      }, 50);
    })

    return () => {
      editorAction.initVditor(undefined)
      unsubscribe()
    };
  }, []);

  const editorContainer = <div id="vditor" className="overflow-y-auto flex-grow bg-background" />

  return (
    <div className="flex flex-col h-full">
      <EditorContextMenu>
        {editorContainer}
      </EditorContextMenu>
      <BottomInfoBar />
    </div>
  )
}