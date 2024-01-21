import useDirectoryStore from "@/store/directoryStore";
import { Tooltip, IconButton } from "@radix-ui/themes";
import { PlusIcon, MoreVertical } from "lucide-react";
import { HeaderDropdownMenus } from "./MoreDropdownMenus";

export function DirectoryPanelHeader() {
  const root = useDirectoryStore(state => state.root);
  return (
    <div className="flex flex-col select-none py-2 pl-2 pr-1 border-b">
      <div className="flex">
        <Tooltip content={root?.path ?? ""}>
          <div className="font-bold self-center">{(root?.name ?? "")}</div>
        </Tooltip>
        <div className="flex-1"></div>
        <Tooltip content="新建文件">
          <IconButton radius="full" mr="2" variant="soft"><PlusIcon width={18} /></IconButton>
        </Tooltip>
        <HeaderDropdownMenus>
          <IconButton radius="full" variant="soft"><MoreVertical width={18} /></IconButton>
        </HeaderDropdownMenus>
      </div>
      {/* <SearchBar /> */}
    </div>
  )
}