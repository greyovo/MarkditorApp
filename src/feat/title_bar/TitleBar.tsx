import { Button, Flex, IconButton, Tooltip } from "@radix-ui/themes"
import styles from "./TitleBar.module.css"
import useDocumentStore, { saveDocument } from "@/store/document"
import { Maximize, Minimize, Minus, MinusIcon, Square, X } from "lucide-react"
import { useEffect, useState } from "react"
import { TitleBarMenuItems } from "./menu_items"
import { Square2StackIcon } from "@heroicons/react/24/outline"
import { PlatformAPI } from "@/ipc"
import { WindowActionButton } from "./WindowActionButton"
import { cn } from "@/utils/styles"
import { dialogActions } from "@/store/dialog"

function TitleSection({ className, title }: { className: string, title: string }) {
  return (
    <div data-tauri-drag-region className={className + " mx-3 my-1 text-center text-ellipsis line-clamp-1"}>
      {title}
    </div>
  )
}

export function WindowTitleBar() {
  const shouldAlertSave = useDocumentStore((state) => state.shouldAlertSave())
  const docTitle = useDocumentStore((state) => state.fileName ?? "")
  const docSaved = useDocumentStore((state) => state.saved)

  let windowTitle = shouldAlertSave ? docTitle + "*" : docTitle

  const iconSize = 17
  const [maximized, setMaximized] = useState(false)

  useEffect(() => {
    const unlisten = PlatformAPI.win.onWillClose(willCloseWindow)
    // FIXME 监听窗口最大化/还原事件
    // const removeListener = window.__ElectronAPI__.onMaximizedChanged((v) => {
    //   setMaximized(v)
    // })
    return () => { unlisten.then((f) => f()) }
  }, [shouldAlertSave])

  function minimizeWindow() {
    PlatformAPI.win.minimize()
  }

  function maximizeWindow() {
    PlatformAPI.win.toggleMaximize()
  }

  function closeWindow() {
    PlatformAPI.win.close()
  }

  async function willCloseWindow(): Promise<boolean> {
    if (shouldAlertSave) {
      dialogActions.showUnsaveAlertIfNeeded({ doNext: closeWindow })
      return false
    } else {
      closeWindow()
      return true
    }
  }

  return (
    <div className={cn(styles.draggable, "bg-background flex border-b select-none")}>
      <Flex className={styles.undraggable} align={"center"} gap="1">
        <TitleBarMenuItems />
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

        <WindowActionButton isDanger onClick={willCloseWindow}>
          <X size={iconSize} />
        </WindowActionButton>
      </Flex>
    </div>
  )
}