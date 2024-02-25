import useDirectoryStore, { selectFile, selectRootDir, setFileByPath, setRootDirByPath } from "@/store/directory";
import { createNewDoc } from "@/store/document";
import usePreferenceStore, { prefActions } from "@/store/preference";
import { getNameFromPath } from "@/utils/path";
import { Button, Flex, Link, Separator } from "@radix-ui/themes";
import { FileTextIcon, FolderIcon, PencilIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

function handleClearHistory() {
  toast("清除所有历史记录？", {
    id: "clear-history",
    position: "top-center",
    action: {
      label: <Button size={"1"}>确认</Button>,
      onClick: () => {
        prefActions.clearAllHistory()
        toast.success("已清除", { id: "clear-history-success" })
      }
    },
  })
}

const MAX_HISTORY_ITEMS = 5;

const HistoryItems = () => {
  const root = useDirectoryStore(s => s.root)
  const { t } = useTranslation()

  const fileHistory = usePreferenceStore(
    (state) => state.fileHistory.filter((_, i) => i < MAX_HISTORY_ITEMS)
  )
  const folderHistory = usePreferenceStore(
    (state) => state.folderHistory.filter((_, i) => i < MAX_HISTORY_ITEMS)
  )

  if (root !== undefined || (fileHistory.length === 0 && folderHistory.length === 0)) {
    return <div></div>
  }

  const fileLabel = fileHistory.length === 0 ? t("history.empty_files") : t("history.recent_files")
  const folderLabel = folderHistory.length === 0 ? t("history.empty_folders") : t("history.recent_folders")

  const clearHistoryLabel = t("welcome.clear_history")

  return (
    <Flex direction={"column"} className="text-sm" gap={"2"} mt={"6"}>
      <Flex direction={"column"} gap={"2"}>
        <div className="opacity-45 text-xs">{fileLabel}</div>
        {fileHistory.map((file) => (
          <HistoryItem key={file} path={file} onClick={() => setFileByPath(file)} />
        ))}
      </Flex>

      <Separator className="w-full my-2" />
      <Flex direction={"column"} gap={"2"}>
        <div className="opacity-45 text-xs">{folderLabel}</div>
        {folderHistory.map((folder) => (
          <HistoryItem key={folder} path={folder} onClick={() => setRootDirByPath(folder)} />
        ))}
      </Flex>

      <Link mt={"3"} size={"1"} className="opacity-70 hover:opacity-100" onClick={handleClearHistory}>
        {clearHistoryLabel}
      </Link>
    </Flex>
  )
}

function HistoryItem({ path, onClick }: { path: string, onClick: () => void }) {
  return (
    <div className="text-left flex items-center select-none">
      <Link onClick={onClick} className="hover:underline text-md max-w-[300px] text-ellipsis line-clamp-1">{getNameFromPath(path, false)}</Link>
      <div className="text-xs ml-3 opacity-55 text-ellipsis line-clamp-1 max-w-[300px]">{path}</div>
    </div>
  )
}

export function Welcome() {

  const { t } = useTranslation();

  return (
    <div className="flex bg-background p-10 gap-9 justify-center items-center" style={{ height: "100%" }}>
      <div className=" flex-shrink-0">
        <div className="select-none">
          <div className="mb-1 text-xl ml-2">{t("welcome.title1")}</div>
          <div className="text-4xl tracking-wider">
            {/* <b>🤗<span className="text-blue-700">Mark</span><span >ditor</span>.</b> */}
            <b>{t("welcome.title2")}</b>
          </div>
        </div>

        <Flex gap="3" mt="3" direction={"column"}>
          <Button size={"3"} onClick={createNewDoc}>
            <PencilIcon size={16} />{t("welcome.new_markdown")}
          </Button>
          <Flex gap="3">
            <Button variant="soft" size={"3"} onClick={selectFile}>
              <FileTextIcon size={16} />{t("welcome.open_file")}
            </Button>
            <Button variant="soft" size={"3"} onClick={selectRootDir}>
              <FolderIcon size={16} />{t("welcome.open_folder")}
            </Button>
          </Flex>
        </Flex>
      </div>

      <HistoryItems />
    </div>
  )
}