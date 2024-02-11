import { ListItem } from "@/components/ListItem"
import { PlatformAPI } from "@/ipc"
import { openDirectory, openFile } from "@/store/directory"
import useDocumentStore from "@/store/document"
import { FolderIcon, FolderOpenIcon } from "@heroicons/react/24/solid"
import { DocumentTextIcon } from "@heroicons/react/24/outline"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"
import { isMarkdownFile } from "@/utils/path"
import { toast } from "sonner"
import { DirectoryContextMenu } from "./DirectoryContextMenu"

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
  const normalStyle = "hover:bg-accent active:bg-accent focus:bg-accent"
  const folderIconStyle = "w-4 text-blue-800"

  const folderIcon = dirOpened
    ? <FolderIcon title="" className={folderIconStyle} /> : <FolderIcon className={folderIconStyle} />
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
        <div className="flex gap-2">{folderIcon} {data.name}</div>
      </ListItem>
      {childrenNode}
    </>
  )
}

function FileItem(props: DirectoryItemProps) {
  const data = props.entity
  const curDocPath = useDocumentStore((state) => state.path ?? "")
  const fileOpened = curDocPath === data.path
  const fileIconStyle = fileOpened ? "w-4 text-forebackground" : "w-4 text-blue-800"
  const fileIcon = <DocumentTextIcon className={fileIconStyle} />

  const normalStyle = fileOpened ? "bg-primary text-forebackground" : "hover:bg-accent active:bg-accent"

  async function handleClick() {
    if (!isMarkdownFile(data.path)) {
      toast.warning("暂不支持打开非 Markdown 文件")
    }
    openFile(data.path)
  }


  return (
    <ListItem
      className={normalStyle}
      key={data.path}
      leadingSpace={15 * props.depth}
      leading={<div className="opacity-0">{fileIcon}</div>}
      onClick={handleClick}
      trailing={<span />}
    >
      <div className="flex gap-2">{fileIcon} {data.name}</div>
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

