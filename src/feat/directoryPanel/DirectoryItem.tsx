import { ListItem } from "@/components/ListItem"
import { PlatformAPI } from "@/ipc"
import useDirectoryStore, { openDirectory, openFile } from "@/store/directoryStore"
import useDocumentStore from "@/store/documentStore"
import { DocumentIcon, FolderIcon, FolderOpenIcon } from "@heroicons/react/24/outline"
import { ChevronDown, ChevronRight, icons } from "lucide-react"
import { useState } from "react"

interface DirectoryItemProps {
  entity: DirectoryEntity,
  open?: boolean,
  depth: number
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

  const normalStyle = "hover:bg-blue-50 active:bg-blue-100 focus:bg-blue-100"

  const folderIconStyle = "w-4 text-blue-800"
  const folderIcon = dirOpened
    ? <FolderOpenIcon className={folderIconStyle} /> : <FolderIcon className={folderIconStyle} />
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
        text={data.name}
        leadingSpace={20 * props.depth}
        leading={folderIcon}
        onClick={handleClick}
        trailing={arrow}
      />
      {childrenNode}
    </>
  )
}

function FileItem(props: DirectoryItemProps) {
  const data = props.entity

  const curDocPath = useDocumentStore((state) => state.path ?? "")
  const fileOpened = curDocPath === data.path
  const fileIconStyle = fileOpened ? "w-4 text-white" : "w-4 text-blue-800"
  const fileIcon = <DocumentIcon className={fileIconStyle} />

  const normalStyle = fileOpened ? "bg-primary text-white" : "hover:bg-blue-50 active:bg-blue-100"

  async function handleClick() {
    openFile(data.path)
  }

  return (
    <ListItem
      className={normalStyle}
      key={data.path}
      text={data.name}
      leadingSpace={20 * props.depth}
      leading={fileIcon}
      onClick={handleClick}
      trailing={<span />}
    />
  )
}

export default function DirectoryItem(props: DirectoryItemProps) {



  /// 是文件夹（目录）
  if (props.entity.type === "dir") {
    return <DirItem entity={props.entity} depth={props.depth} open={props.open} />
  } else {
    return <FileItem entity={props.entity} depth={props.depth} open={props.open} />

  }
}

