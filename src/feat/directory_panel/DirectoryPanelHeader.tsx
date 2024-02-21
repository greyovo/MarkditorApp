import useDirectoryStore from "@/store/directory";
import { Tooltip } from "@radix-ui/themes";

export function DirectoryPanelHeader() {
  const root = useDirectoryStore(state => state.root);
  return (
    <div className="flex flex-col select-none py-1 pl-3 pr-1 border-b">
      <div className="flex">
        <Tooltip content={root?.path ?? ""}>
          <div className="font-bold self-center text-sm">{(root?.name ?? "")}</div>
        </Tooltip>
        <div className="flex-1"></div>
      </div>
    </div>
  )
}