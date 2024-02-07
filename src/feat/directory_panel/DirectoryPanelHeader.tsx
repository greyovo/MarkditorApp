import useDirectoryStore from "@/store/directory";
import { Tooltip, IconButton } from "@radix-ui/themes";
import { PlusIcon, MoreVertical, MoreHorizontal } from "lucide-react";
import { DirectoryDropdownMenus } from "./DirectoryDropdownMenus";

export function DirectoryPanelHeader() {
  const root = useDirectoryStore(state => state.root);
  return (
    <div className="flex flex-col select-none py-1 pl-3 pr-1 border-b">
      <div className="flex">
        <Tooltip content={root?.path ?? ""}>
          <div className="font-bold self-center text-sm">{(root?.name ?? "")}</div>
        </Tooltip>
        <div className="flex-1"></div>
        {/* <DirectoryDropdownMenus>
          <IconButton size="1" className="bg-transparent hover:bg-accent active:bg-accent"
            radius="full" variant="soft">
            <MoreHorizontal width={16} />
          </IconButton>
        </DirectoryDropdownMenus> */}
      </div>
      {/* <SearchBar /> */}
    </div>
  )
}