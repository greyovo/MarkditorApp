
import { BookmarkIcon, Cog6ToothIcon, FolderOpenIcon } from "@heroicons/react/24/outline";
import DirectoryItem from "./DirectoryItem";
import { Button, ContextMenu, IconButton } from "@radix-ui/themes";
import { PlatformAPI } from "@/ipc";
import useDocumentStore from "@/store/document_store";

function DirectorySideBarHeader() {

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
  async function openFile() {
    // 打开文件
    const result = (await PlatformAPI.openFile())
    if (result !== undefined) {
      const { path, content } = result!
      useDocumentStore.setState((state) => ({ ...state, path, content }))
    } else {
      console.log("打开文件失败！");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="text-gray-400 m-3 select-none">😶 没有文件</p>
      <Button onClick={openFile}>
        <FolderOpenIcon width="16" height="16" /> 打开...
      </Button>
    </div>
  )
}

export default function DirectorySideBar() {

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* <DirectorySideBarHeader /> */}
      <DirectoryEmptyView />
      {/* <DirectoryItem depth={0} type={"directory"} label="Apple" />
      <DirectoryItem depth={0} type={"directory"} open={true} label="MyDocuments" />
      <DirectoryItem depth={1} type={"file"} label="diary.md" />
      <DirectoryItem depth={1} type={"file"} label="notes.md" />
      <DirectoryItem depth={0} type={"file"} label="config.ini" /> */}
    </div>
  )
}