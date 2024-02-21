import { useEffect, useState } from "react";
import Vditor from "vditor";
import { EditorContextMenu } from "./EditorContextMenu";
import useDocumentStore, { saveDocument, updateContent } from "@/store/document";
import { BottomInfoBar } from "./BottomInfoBar";
import { EnvConstants } from "@/utils/constants";
import useEditorStore, { editorAction, getVditor } from "@/store/editor";
import { convertImagePath, isHttpUrl, isMarkdownFile, resolveFromRelativePath } from "@/utils/path";
import usePreferenceStore from "@/store/preference";
import { handleEditorHotKey } from "@/utils/hotkeys";
import { PlatformAPI } from "@/ipc";
import { openFile, setFileByPath } from "@/store/directory";
import { dialogActions } from "@/store/dialog";
import { toast } from "sonner";

// const _placeHolder = "# Welcome to Markditor \nHello, welcome to `Markditor`.\n# 欢迎使用 Markditor\n你好，欢迎使用 `Markditor`"
const _placeHolder = "在此开始记录..."

export function Editor() {
  const themeMode = usePreferenceStore(s => s.themeMode())
  const defaultShowToolbar = usePreferenceStore(s => s.defaultShowToolbar)
  useEffect(() => {
    let vditor: Vditor
    // vidtor options
    const optioins: IOptions = {
      undoDelay: 100,
      after: () => {
        // TODO 显示上次关闭时未保存的内容？是则 updateContent，否则设置空串
        const content = useDocumentStore.getState().content
        vditor.setValue(content ?? "")
        editorAction.initVditor(vditor)
      },
      placeholder: _placeHolder,
      cdn: "./lib",
      height: "100%",
      borderless: true,
      toolbarConfig: {
        enable: defaultShowToolbar
      },
      theme: themeMode === "light" ? "classic" : "dark",
      cache: {
        enable: false
      },
      link: {
        click: (bom: Element) => {
          const href = bom.textContent ?? ""
          if (isHttpUrl(href)) {
            PlatformAPI.openInBrowser(href)
          } else if (isMarkdownFile(href)) {
            const fullPath = resolveFromRelativePath(href, useDocumentStore.getState().baseDir ?? "")
            dialogActions.showUnsaveAlertIfNeeded({
              doNext: () => {
                openFile(fullPath.replaceAll("/", "\\"))
                document.querySelector("div")
              }
            })
          } else {
            toast.warning("暂不支持打开此链接", { description: href, id: "open-link-warning" + href })
          }
        }
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
        updateContent(v)
      },
      preview: {
        hljs: {
          langs: EnvConstants.CODE_LANGUAGES
        }
      }
    }

    vditor = new Vditor("vditor-container", optioins);

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

    document.addEventListener("keydown", handleEditorHotKey)

    return () => {
      editorAction.initVditor(undefined)
      unsubscribe()
      document.removeEventListener("keydown", handleEditorHotKey)
    };
  }, []);

  const editorContainer = <div id="vditor-container" className="overflow-y-auto flex-grow bg-background" />

  return (
    <div className="flex flex-col h-full">
      <EditorContextMenu>
        {editorContainer}
      </EditorContextMenu>
      <BottomInfoBar />
    </div>
  )
}