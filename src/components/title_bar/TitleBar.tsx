import { Button, Flex, IconButton, Tooltip } from "@radix-ui/themes"
import styles from "./TitleBar.module.css"
import useDocumentStore from "@/store/document"
import { Minus, MinusIcon, Square, X } from "lucide-react"
import { ReactNode } from "react"
import { titleBarMenuItems } from "./menu_items"

function minimizeWindow() {
}

function maximizeWindow() {
}

function closeWindow() {
}

type ButtonIconProps = { children: ReactNode, onClick: () => void, isDanger?: boolean }

const ButtonIcon = ({ children, onClick, isDanger = false }: ButtonIconProps) => {
  const cls = isDanger
    ? "hover:bg-red-600 active:bg-red-700 hover:text-primary-foreground active:text-primary-foreground"
    : "hover:bg-gray-100 active:bg-gray-300"
  return (
    <div className={"px-3 py-2 w-12 h-8 text-center flex items-center justify-center " + cls} onClick={onClick}>
      {children}
    </div>
  )
}

export function WindowTitleBar() {
  const title = useDocumentStore((state) => state.fileName ?? "Untitled.md")
  const saved = useDocumentStore((state) => state.saved)
  const iconSize = 18

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
          <Square size={iconSize - 3} />
        </ButtonIcon>
        <ButtonIcon isDanger onClick={closeWindow}>
          <X size={iconSize} />
        </ButtonIcon>
      </Flex>
    </div>
  )
}