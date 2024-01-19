import { PlatformAPI } from "@/ipc"
import useDocumentStore from "@/store/documentStore"
import { DocumentIcon, FolderIcon, FolderOpenIcon } from "@heroicons/react/24/outline"
import { ChevronDown, ChevronRight, icons } from "lucide-react"

interface DirectoryItemProps {
  type: "file" | "dir"
  open?: boolean,
  label?: string,
  path: string,
  depth: number
}

export default function DirectoryItem(props: DirectoryItemProps) {
  async function handleClick() {
    if (props.type === "dir") {
      // Toggle open state and re-render
    } else {
      const content = await PlatformAPI.readFile(props.path)
      useDocumentStore.getState().setFile(props.path, content ?? "")
    }
  }

  const iconStyle = props.open ? "w-4 text-white" : "w-4 text-blue-800"
  const fileIcon = <DocumentIcon className={iconStyle} />
  const folderIcon = props.open
    ? <FolderOpenIcon className={iconStyle} /> : <FolderIcon className={iconStyle} />
  const arrow = props.open
    ? <ChevronDown className={iconStyle} /> : <ChevronRight className={iconStyle} />

  const fileStyle = props.open ? "bg-primary text-white" : "hover:bg-blue-50 active:bg-blue-100"

  return (
    <a onClick={handleClick}
      className={`flex rounded-lg px-3 py-2 mx-1 hover:underline ${fileStyle}`}>
      <div style={{ width: 20 * props.depth }}></div>
      {props.type === "file" ? fileIcon : folderIcon}
      <div className="ml-2 select-none">
        {props.label}
      </div>
      <div className="flex-1"></div>
      {props.type === "dir" && arrow}
    </a>
  )
}