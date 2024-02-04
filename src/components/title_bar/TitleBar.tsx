import { Button, Flex, IconButton, Tooltip } from "@radix-ui/themes"
import styles from "./TitleBar.module.css"
import useDocumentStore from "@/store/document"
import { Maximize, Minimize, Minus, MinusIcon, Square, X } from "lucide-react"
import { ReactNode } from "react"
import { titleBarMenuItems } from "./menu_items"
import { Square2StackIcon } from "@heroicons/react/24/outline"
import { PlatformAPI } from "@/ipc"

function minimizeWindow() {
  PlatformAPI.win.minimize()
}

function maximizeWindow() {
}

function closeWindow() {
}

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
  const iconSize = 17

  return (
    <div className={styles.draggable + " flex border-b select-none"}>
      <Flex className={styles.undraggable} align={"center"} gap="1">
        {titleBarMenuItems}
      </Flex>

      <div className="flex-1 mx-3 my-1 text-center">{title}{!saved && "*"}</div>

      <Flex className={styles.undraggable} gap="1">
        <ButtonIcon onClick={minimizeWindow}>
          <Minus size={iconSize + 1} />
        </ButtonIcon>
        <ButtonIcon onClick={maximizeWindow}>
          {/* <Square size={iconSize - 1} /> */}
          <Square2StackIcon className="rotate-90" strokeWidth={1.8} width={iconSize} />
        </ButtonIcon>
        <ButtonIcon isDanger onClick={closeWindow}>
          <X size={iconSize} />
        </ButtonIcon>
      </Flex>
    </div>
  )
}