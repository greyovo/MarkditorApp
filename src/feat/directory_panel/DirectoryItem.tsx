import { ListItem } from "@/components/ListItem"
import { PlatformAPI } from "@/ipc"
import useDirectoryStore, { openDirectory, openFile } from "@/store/directory"
import useDocumentStore from "@/store/document"
import { FolderIcon, FolderOpenIcon } from "@heroicons/react/24/solid"
import { DocumentTextIcon } from "@heroicons/react/24/outline"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { DialogContext } from "@/components/dialog/DialogContext"
import { isMarkdownFile } from "@/utils/path"
import { toast } from "sonner"
import { DirectoryContextMenu } from "./DirectoryContextMenu"

interface DirectoryItemProps {
  entity: DirectoryEntity,
  open?: boolean,
  depth: number,
  editable?: boolean,
  onBlur?: () => void,
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
  const normalStyle = "hover:bg-primary-50 active:bg-primary-100 focus:bg-primary-100"
  const folderIconStyle = "w-4 text-primary-600"

  const folderIcon = dirOpened
    ? <FolderIcon className={folderIconStyle} /> :
    <FolderIcon className={folderIconStyle} />

  const arrow = dirOpened
    ? <ChevronDown className={folderIconStyle} /> :
    <ChevronRight className={folderIconStyle} />

  async function handleClick() {
    if (dirOpened) {
      setDirOpened(false)
      return
    }
    openDirectory(data.path)
    setDirOpened(true)
  }

  //-------------------------------------------------------
  // TODO 封装一个可编辑的列表项，避免重复代码（DirItem、FileItem）
  const inputRefs = useRef<HTMLInputElement>(null)
  const inputEl =
    <input id="myinput" ref={inputRefs}
      className="text-black"
      defaultValue={data.name}
      onBlur={() => { props.onBlur?.() }}
    />

  const content = props.editable ? inputEl : data.name

  useEffect(() => {
    setTimeout(() => {
      inputRefs.current?.focus()
      inputRefs.current?.select()
    }, 200);
  }, [props.editable])
  // ------------------------------------------------------

  return (
    <>
      <ListItem
        className={normalStyle}
        key={data.path}
        leadingSpace={20 * props.depth}
        leading={folderIcon}
        onClick={props.editable ? () => { } : handleClick}
        trailing={arrow}
      >{content}
      </ListItem>
      {childrenNode}
    </>
  )
}

function FileItem(props: DirectoryItemProps) {
  const data = props.entity
  const isMarkdown = isMarkdownFile(data.name)
  const curDocPath = useDocumentStore((state) => state.path ?? "")
  const fileOpened = curDocPath === data.path

  let iconStyle = ""
  let textStyle = ""
  if (fileOpened) {
    textStyle = "bg-primary text-white"
    iconStyle = "w-4 text-white"
  } else {
    if (isMarkdown) {
      textStyle = "hover:bg-primary-50 active:bg-primary-100"
      iconStyle = "w-4 text-primary-600"
    } else {
      textStyle = "text-default-400"
      iconStyle = "w-4 text-default-400"
    }
  }

  const icon = <DocumentTextIcon className={iconStyle} />


  async function handleClick() {
    if (!isMarkdownFile(data.path)) {
      toast.warning("暂不支持打开非 Markdown 文件")
    }
    openFile(data.path)
  }

  const inputRefs = useRef<HTMLInputElement>(null)
  const inputEl =
    <input id="myinput" ref={inputRefs}
      className="text-black"
      defaultValue={data.name}
      onBlur={() => { props.onBlur?.() }}
    />

  const content = props.editable ? inputEl : data.name

  useEffect(() => {
    setTimeout(() => {
      inputRefs.current?.focus()
      inputRefs.current?.select()
    }, 200);
  }, [props.editable])

  return (
    <ListItem
      className={textStyle}
      key={data.path}
      leadingSpace={20 * props.depth}
      leading={icon}
      onClick={props.editable ? () => { } : handleClick}
      trailing={<span />}
    >
      {content}
    </ListItem>
  )
}

export default function DirectoryItem(props: DirectoryItemProps) {
  const [enableRename, setEnableRename] = useState(false)
  let child
  if (props.entity.type === "dir") {
    child = <DirItem entity={props.entity} depth={props.depth} open={props.open} editable={enableRename} onBlur={() => { setEnableRename(false) }} />
  } else {
    child = <FileItem entity={props.entity} depth={props.depth} open={props.open} editable={enableRename} onBlur={() => { setEnableRename(false) }} />
  }

  return (
    <DirectoryContextMenu entity={props.entity} onRename={() => setEnableRename(true)}>
      <div>{child}</div>
    </DirectoryContextMenu>
  )
}

