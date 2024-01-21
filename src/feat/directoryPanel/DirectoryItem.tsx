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

export default function DirectoryItem(props: DirectoryItemProps) {
  const data = props.entity

  const curDocPath = useDocumentStore((state) => state.path ?? "")
  const [dirOpened, setDirOpened] = useState(false)
  const fileOpened = curDocPath === data.path

  async function handleClick() {
    if (data.type === "dir") {
      if (dirOpened) {
        setDirOpened(false)
        return
      }
      openDirectory(data.path)
      setDirOpened(true)
    } else {
      openFile(data.path)
    }
  }

  const childrenNode = dirOpened ? extractChildrenNode(data.children, props.depth + 1) : []

  const opened = dirOpened || fileOpened
  const iconStyle = opened ? "w-4 text-white" : "w-4 text-blue-800"
  const fileStyle = opened ? "bg-primary text-white" : "hover:bg-blue-50 active:bg-blue-100"
  const fileIcon = <DocumentIcon className={iconStyle} />

  const folderIcon = opened
    ? <FolderOpenIcon className={iconStyle} /> : <FolderIcon className={iconStyle} />
  const arrow = opened
    ? <ChevronDown className={iconStyle} /> : <ChevronRight className={iconStyle} />

  return (
    <>
      <a onClick={handleClick}
        className={`flex rounded-lg px-3 py-2 mx-1 hover:underline ${fileStyle}`}>
        <div style={{ width: 20 * props.depth }}></div>
        {data.type === "file" ? fileIcon : folderIcon}
        <div className="ml-2 select-none">
          {data.name}
        </div>
        <div className="flex-1"></div>
        {data.type === "dir" && arrow}
      </a>
      {childrenNode}
    </>
  )
}