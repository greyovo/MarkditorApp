import { DocumentIcon, FolderIcon, FolderOpenIcon } from "@heroicons/react/24/outline"

interface DirectoryItemProps {
  type: "file" | "directory"
  open?: boolean,
  label?: string,
  depth: number
}

export default function DirectoryItem(props: DirectoryItemProps) {

  const folderIcon = props.open ? <FolderOpenIcon className="w-4" /> : <FolderIcon className="w-4" />

  return (
    <a onClick={() => { }} 
    className="flex rounded px-3 py-2 hover:bg-indigo-50 hover:underline active:bg-indigo-100">
      <div style={{ width: 20 * props.depth }}></div>
      {props.type === "file" ? <DocumentIcon className="w-4" /> : folderIcon}
      <div className="ml-2 select-none">
        {props.label}
      </div>
    </a>
  )
}