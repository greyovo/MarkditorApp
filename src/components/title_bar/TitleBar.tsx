import { Button, Flex, IconButton, Tooltip } from "@radix-ui/themes"
import styles from "./TitleBar.module.css"
import useDocumentStore, { saveFile } from "@/store/document"
import { Maximize, Minimize, Minus, MinusIcon, Square, X } from "lucide-react"
import { ReactNode, useEffect, useState } from "react"
import { titleBarMenuItems } from "./menu_items"
import { Square2StackIcon } from "@heroicons/react/24/outline"
import { PlatformAPI } from "@/ipc"
import { useDialog } from "../dialog/Dialog"



type ButtonIconProps = { children: ReactNode, onClick: () => void, isDanger?: boolean }

const ButtonIcon = ({ children, onClick, isDanger = false }: ButtonIconProps) => {
  const cls = isDanger
    ? "hover:bg-red-600 active:bg-red-700 hover:text-primary-foreground active:text-primary-foreground"
    : "hover:bg-gray-200 active:bg-gray-300"
  return (
    <div className={
      "px-1 py-1 w-11 h-8 text-center flex items-center justify-center transition ease-in-out duration-200 "
      + cls
    } onClick={onClick}>
      {children}
    </div>
  )
}

export function WindowTitleBar() {
  const title = useDocumentStore((state) => state.fileName ?? "Untitled.md")
  const saved = useDocumentStore((state) => state.saved)
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

    if (!saved && content.trim().length > 0) {
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
    <div data-tauri-drag-region className={styles.draggable + " flex border-b select-none"}>
      <Flex className={styles.undraggable} align={"center"} gap="1">
        {titleBarMenuItems}
      </Flex>

      <div data-tauri-drag-region className="flex-1 mx-3 my-1 text-center text-ellipsis line-clamp-1">{title}{!saved && "*"}</div>

      <Flex className={styles.undraggable} gap="1">
        <ButtonIcon onClick={minimizeWindow}>
          <Minus size={iconSize + 1} />
        </ButtonIcon>
        <ButtonIcon onClick={maximizeWindow}>
          {maximized
            ? <Square2StackIcon className="rotate-90" strokeWidth={1.8} width={iconSize} />
            : <Square size={iconSize - 1} />}
        </ButtonIcon>
        <ButtonIcon isDanger onClick={closeWindow}>
          <X size={iconSize} />
        </ButtonIcon>
      </Flex>
    </div>
  )
}