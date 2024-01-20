
import { BookmarkIcon, Cog6ToothIcon, FolderOpenIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import DirectoryItem from "./DirectoryItem";
import { Button, ContextMenu, Dialog, Flex, IconButton, TextField } from "@radix-ui/themes";
import { PlatformAPI } from "@/ipc";
import useDocumentStore from "@/store/documentStore";
import useDirectoryStore from "@/store/directoryStore";
import { SearchBar } from "./SearchBar";

function DirectoryPanelHeader() {
  return (
    <div className="flex justify-between select-none py-3 px-3">
      <SearchBar />
    </div>
    // <div className="flex justify-between border-b select-none py-4 px-3">
    //   <div className="flex flex-col">
    //     <h1 className="text-xl font-bold">Markditor</h1>
    //     <p className="text-xs opacity-70">{"powered by "}
    //       <a className="text-blue-800" target="_blank" href="https://github.com/Vanessa219/vditor">Vditor</a>
    //     </p>
    //   </div>
    //   <IconButton className="self-center" size="2" variant="soft">
    //     <Cog6ToothIcon width="22" height="22" />
    //   </IconButton>
    // </div>
  )
}

function DirectoryEmptyView() {
  const setRootDir = useDirectoryStore((state) => state.setRootDirectory)

  async function selectRootDir() {
    const result = (await PlatformAPI.selectDirectory())
    console.log(result);
    if (result !== undefined) {
      setRootDir(result)
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

  const children = useDirectoryStore((state) => state.root?.children ?? [])

  // const children = root?.children ?? []
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
    <div className="flex flex-col h-full">
      {root !== undefined && <DirectoryPanelHeader />}
      <div className="h-full overflow-y-auto">
        {root !== undefined ? <DirectoryListView /> : <DirectoryEmptyView />}
      </div>
    </div>
  )
}