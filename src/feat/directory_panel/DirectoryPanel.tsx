
import { FolderOpenIcon } from "@heroicons/react/24/outline";
import { extractChildrenNode } from "./DirectoryItem";
import { Button, } from "@radix-ui/themes";
import { PlatformAPI } from "@/ipc";
import useDirectoryStore, { selectRootDir } from "@/store/directory";
import { DirectoryPanelHeader } from "./DirectoryPanelHeader";

function DirectoryEmptyView() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="text-gray-400 m-3 select-none">😶 没有文件</p>
      <Button onClick={() => selectRootDir()}>
        <FolderOpenIcon width="16" height="16" /> 打开...
      </Button>
    </div>
  )
}


function DirectoryTreeView() {
  const children = useDirectoryStore((state) => state.root?.children ?? [])
  
  const childrenNode = extractChildrenNode(children, 0)

  return (
    <div className="flex flex-col">
      {childrenNode}
    </div>
  )
}

export function DirectoryPanel() {

  const root = useDirectoryStore((state) => state.root)

  return (
    <div className="flex flex-col h-full">
      {root !== undefined && <DirectoryPanelHeader />}
      <div className="h-full overflow-y-auto">
        {root !== undefined ? <DirectoryTreeView /> : <DirectoryEmptyView />}
      </div>
    </div>
  )
}