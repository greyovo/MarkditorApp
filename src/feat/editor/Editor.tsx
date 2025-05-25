import { useEffect, useState } from "react";
import Vditor from "vditor";
import { EditorContextMenu } from "./EditorContextMenu";
import useDocumentStore, { saveDocument, updateContent } from "@/store/document";
import { BottomInfoBar } from "./BottomInfoBar";
import { EnvConstants } from "@/utils/constants";
import { editorAction, getVditor } from "@/store/editor";
import { convertImagePath } from "@/utils/path";
import usePreferenceStore from "@/store/preference";
import { handleEditorHotKey } from "@/utils/hotkeys";
import { t } from "i18next";

function initVditor() {
  const themeMode = usePreferenceStore.getState().themeMode()
  const defaultShowToolbar = usePreferenceStore.getState().defaultShowToolbar
  if (defaultShowToolbar) {
    editorAction.toggleToolbar(true)
  }
  const _placeHolder = t("editor.placeholder")

  let vditor: Vditor
  const optioins: IOptions = {
    undoDelay: 100,
    after: () => {
      const content = useDocumentStore.getState().content
      vditor.setValue(content ?? "")
      editorAction.initVditor(vditor)
    },
    input: (value) => {
      updateContent(value)
    },
    placeholder: _placeHolder,
    cdn: "../lib",
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
      click: (bom: Element) =>
        editorAction.handleClickUrl(bom.textContent)
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
      // TODO Paste images
      handler: (files) => {
        files.forEach(file => {
          vditor.insertValue(`![${file.path}](images.png)`)
        })
        return null
      },
    },
    preview: {
      hljs: {
        langs: EnvConstants.CODE_LANGUAGES
      }
    }
  }

  vditor = new Vditor("vditor-container", optioins);
}

export function Editor() {
  useEffect(() => {
    initVditor()

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