
import { BookmarkIcon, Cog6ToothIcon, FolderOpenIcon } from "@heroicons/react/24/outline";
import DirectoryItem from "./DirectoryItem";
import { Button, ContextMenu, Dialog, Flex, IconButton } from "@radix-ui/themes";
import { PlatformAPI } from "@/ipc";
import useDocumentStore from "@/store/documentStore";
import useDirectoryStore from "@/store/directoryStore";

function DirectoryPanelHeader() {
  return (
    <div className="flex justify-between border-b select-none py-4 px-3">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">Markditor</h1>
        <p className="text-xs opacity-70">{"powered by "}
          <a className="text-blue-800" target="_blank" href="https://github.com/Vanessa219/vditor">Vditor</a>
        </p>
      </div>
      <IconButton className="self-center" size="2" variant="soft">
        <Cog6ToothIcon width="22" height="22" />
      </IconButton>
      {/* <button className=" align-middle rounded-lg m-4 p-2 hover:bg-gray-100 active:bg-gray-200">
        <Cog6ToothIcon className="h-6 w-6 text-gray-700" />
      </button> */}
    </div>
  )
}

function DirectoryEmptyView() {
  async function selectRootDir() {
    // 打开文件
    const result = (await PlatformAPI.selectDirectory())
    console.log(result);
    if (result !== undefined) {
      useDirectoryStore.setState((state) => ({ ...state, root: result }))
    } else {
      console.log("打开文件失败！");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="text-gray-400 m-3 select-none">😶 没有文件</p>
      <Button onClick={selectRootDir}>
        <FolderOpenIcon width="16" height="16" /> 打开...
      </Button>
    </div>
  )
}

function DirectoryListView() {
  const root = useDirectoryStore((state) => state.root)

  // const children = useDirectoryStore((state) => state.root?.children ?? [])

  const children = root?.children ?? []
  const curDocPath = useDocumentStore((state) => state.path ?? "")

  return (
    <div className="flex flex-col">
      {children.map((e) => {
        return <DirectoryItem
          open={curDocPath === e.path}
          key={e.path} type={e.type} depth={0} label={e.name} path={e.path} />
      })}
    </div>
  )
}

export function DirectoryPanel() {

  const root = useDirectoryStore((state) => state.root)

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {root !== undefined && <DirectoryPanelHeader />}
      {root !== undefined ? <DirectoryListView /> : <DirectoryEmptyView />}
    </div>
  )
}