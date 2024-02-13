import { Button, Flex, IconButton, Tooltip } from "@radix-ui/themes"
import styles from "./TitleBar.module.css"
import useDocumentStore, { saveFile } from "@/store/document"
import { Maximize, Minimize, Minus, MinusIcon, Square, X } from "lucide-react"
import { useEffect, useState } from "react"
import { titleBarMenuItems } from "./menu_items"
import { Square2StackIcon } from "@heroicons/react/24/outline"
import { PlatformAPI } from "@/ipc"
import { useDialog } from "../../components/dialog/Dialog"
import { WindowActionButton } from "./WindowActionButton"

function TitleSection({ className, title }: { className: string, title: string }) {
  return (
    <div data-tauri-drag-region className={className + " mx-3 my-1 text-center text-ellipsis line-clamp-1"}>
      {title}
    </div>
  )
}

export function WindowTitleBar() {
  const hasDoc = useDocumentStore((state) => state.hasDocOpened())
  const docTitle = useDocumentStore((state) => state.fileName ?? "")
  const docSaved = useDocumentStore((state) => state.saved)

  let windowTitle = ""
  if (hasDoc) {
    windowTitle = docSaved ? docTitle : docTitle + "*"
  }

  const { openDialog } = useDialog()
  const iconSize = 17
  const [maximized, setMaximized] = useState(false)

  useEffect(() => {
    // FIXME 监听窗口最大化/还原事件
    // const removeListener = window.__ElectronAPI__.onMaximizedChanged((v) => {
    //   setMaximized(v)
    // })
    // return removeListener
  }, [])

  function minimizeWindow() {
    PlatformAPI.win.minimize()
  }

  function maximizeWindow() {
    PlatformAPI.win.toggleMaximize()
  }

  function closeWindow() {
    const content = useDocumentStore.getState().content ?? ""

    if (!docSaved && content.trim().length > 0) {
      openDialog({
        title: "保存更改？",
        content: "要在关闭前保存修改后的内容吗？",
        confirmText: "保存",
        denyText: "不保存",
        showCancel: true,
        onConfirm: async () => {
          await saveFile()
          PlatformAPI.win.close()
        },
        onDeny: () => {
          PlatformAPI.win.close()
        }
      })
    } else {
      PlatformAPI.win.close()
    }
  }

  return (
    <div className={styles.draggable + " bg-background flex border-b select-none"}>
      <Flex className={styles.undraggable} align={"center"} gap="1">
        {titleBarMenuItems}
      </Flex>

      <TitleSection className="flex-1" title={windowTitle} />

      <Flex className={styles.undraggable} gap="1">
        <WindowActionButton onClick={minimizeWindow}>
          <Minus size={iconSize + 1} />
        </WindowActionButton>
        <WindowActionButton onClick={maximizeWindow}>
          {maximized
            ? <Square2StackIcon className="rotate-90" strokeWidth={1.8} width={iconSize} />
            : <Square size={iconSize - 1} />}
        </WindowActionButton>
        <WindowActionButton isDanger onClick={closeWindow}>
          <X size={iconSize} />
        </WindowActionButton>
      </Flex>
    </div>
  )
}