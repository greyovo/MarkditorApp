import { ListItem } from "@/components/ListItem"
import { PlatformAPI } from "@/ipc"
import { openDirectory, openFile } from "@/store/directory"
import useDocumentStore from "@/store/document"
import { FolderIcon, FolderOpenIcon } from "@heroicons/react/24/solid"
import { DocumentTextIcon } from "@heroicons/react/24/outline"
import { ChevronDown, ChevronRight, Folder, FolderClosed } from "lucide-react"
import { useState } from "react"
import { isMarkdownFile } from "@/utils/path"
import { toast } from "sonner"
import { DirectoryContextMenu } from "./DirectoryContextMenu"
import { cn } from "@/utils"
import { Flex } from "@radix-ui/themes"
import { dialogActions } from "@/store/dialog"

interface DirectoryItemProps {
  entity: DirectoryEntity,
  open?: boolean,
  depth: number,
}

export function extractChildrenNode
  (dirs: DirectoryEntity[], depth: number) {
  if (!dirs || dirs.length === 0) {
    return []
  }
  const children = []
  for (const d of dirs) {
    children.push(
      <DirectoryItem key={d.path} depth={depth} entity={d} />
    )
  }
  return children
}


function DirItem(props: DirectoryItemProps) {
  const data = props.entity
  const [dirOpened, setDirOpened] = useState(false)
  const childrenNode = dirOpened ? extractChildrenNode(data.children, props.depth + 1) : []
  const normalStyle = "pl-[12px] hover:bg-accent active:bg-accent focus:bg-accent text-foreground opacity-75 hover:opacity-100"
  const folderIconStyle = "w-[15px] opacity-75"

  const folderIcon = dirOpened
    ? <Folder className={folderIconStyle} /> : <FolderClosed className={folderIconStyle} />
  const arrow = dirOpened
    ? <ChevronDown className={folderIconStyle} /> : <ChevronRight className={folderIconStyle} />

  async function handleClick() {
    if (dirOpened) {
      setDirOpened(false)
      return
    }
    openDirectory(data.path)
    setDirOpened(true)
  }

  return (
    <>
      <ListItem
        className={normalStyle}
        key={data.path}
        leadingSpace={15 * props.depth}
        leading={arrow}
        onClick={handleClick}
      >
        <div className="flex gap-2 justify-center items-center">{folderIcon} {data.name}</div>
      </ListItem>
      {childrenNode}
    </>
  )
}

function FileItem(props: DirectoryItemProps) {
  const data = props.entity
  const curDocPath = useDocumentStore((state) => state.path ?? "")
  const fileOpened = curDocPath === data.path
  const fileIconStyle = "w-[15px] opacity-75"
  const fileIcon = <DocumentTextIcon className={fileIconStyle} />

  const normalStyle = fileOpened ? "border-l-[4px] bg-accent" : "pl-[12px] hover:bg-accent active:bg-accent text-accent-foreground opacity-75 hover:opacity-100"

  async function handleClick() {
    if (useDocumentStore.getState().path === data.path) {
      return
    }

    if (!isMarkdownFile(data.path)) {
      toast.warning("暂不支持打开非 Markdown 文件")
      return
    }
    dialogActions.showUnsaveAlertIfNeeded(
      { doNext: () => openFile(data.path) }
    )
  }


  return (
    <ListItem
      className={cn(normalStyle, " border-l-primary")}
      key={data.path}
      leadingSpace={15 * props.depth}
      leading={<div className="opacity-0">{fileIcon}</div>}
      onClick={handleClick}
      trailing={<span />}
    >
      <div data-fileId={data.path} className="flex gap-2">{fileIcon} {data.name}</div>
    </ListItem>
  )
}

export default function DirectoryItem(props: DirectoryItemProps) {
  let child
  if (props.entity.type === "dir") {
    child = <DirItem entity={props.entity} depth={props.depth} open={props.open} />
  } else {
    child = <FileItem entity={props.entity} depth={props.depth} open={props.open} />
  }

  return (
    <DirectoryContextMenu entity={props.entity}>
      <div>{child}</div>
    </DirectoryContextMenu>
  )
}

