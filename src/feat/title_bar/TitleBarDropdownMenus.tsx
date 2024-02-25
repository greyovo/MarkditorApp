import useDirectoryStore, { refreshRootDir, selectFile, selectRootDir, setFileByPath, setRootDirByPath } from "@/store/directory";
import { closeCurrentDoc } from "@/store/document";
import { DropdownMenu, Button, Flex } from "@radix-ui/themes";
import { SettingDialog } from "../settings/SettingDialog";
import { useState } from "react";
import { RefreshCcw, Settings } from "lucide-react";
import { dialogActions } from "@/store/dialog";
import usePreferenceStore, { prefActions } from "@/store/preference";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const HistoryItems = () => {

  const fileHistory = usePreferenceStore((state) => state.fileHistory)
  const folderHistory = usePreferenceStore((state) => state.folderHistory)
  const isAllEmpty = fileHistory.length === 0 && folderHistory.length === 0

  const fileLabel = fileHistory.length === 0 ? "无最近文件" : "最近文件"
  const folderLabel = folderHistory.length === 0 ? "无最近文件夹" : "最近文件夹"

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

  function handleOpenFile(file: string) {
    dialogActions.showUnsaveAlertIfNeeded({
      doNext: () => setFileByPath(file)
    })
  }

  function handleOpenFolder(folder: string) {
    dialogActions.showUnsaveAlertIfNeeded({
      doNext: () => setRootDirByPath(folder)
    })
  }

  return (
    <>
      <DropdownMenu.Label key={"fileLabel"}>{fileLabel}</DropdownMenu.Label>
      {fileHistory.map((file) => (
        <DropdownMenu.Item onClick={() => handleOpenFile(file)} key={file}>{file}</DropdownMenu.Item>)
      )}
      <DropdownMenu.Separator />
      <DropdownMenu.Label key={"folderLabel"}>{folderLabel}</DropdownMenu.Label>
      {folderHistory.map((folder) => (
        <DropdownMenu.Item onClick={() => handleOpenFolder(folder)} key={folder}>{folder}</DropdownMenu.Item>)
      )}
      {!isAllEmpty && <DropdownMenu.Separator />}
      {!isAllEmpty && <DropdownMenu.Item onClick={handleClearHistory}>清除历史</DropdownMenu.Item>}
    </>
  )
}


export function TitleBarDropdownMenus({ children }: { children: React.ReactNode }) {
  const [settingVisible, setSettingVisible] = useState(false)

  function handleSelectFile() {
    dialogActions.showUnsaveAlertIfNeeded({
      doNext: selectFile
    })
  }

  function handleSelectRootDir() {
    dialogActions.showUnsaveAlertIfNeeded({
      doNext: selectRootDir
    })
  }

  const { t } = useTranslation()

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div>{children}</div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onClick={handleSelectFile}>{t("titlebar_dropdown.open_file")}</DropdownMenu.Item>
          <DropdownMenu.Item onClick={handleSelectRootDir}>打开文件夹...</DropdownMenu.Item>

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>最近打开</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <HistoryItems />
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>

          {/* <DropdownMenu.Item onClick={closeCurrentDoc}>关闭当前</DropdownMenu.Item> */}

          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={refreshRootDir}>刷新</DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => setSettingVisible(true)}>
            <Flex gap={"2"} align={"center"}> {/*<Settings size={14} />*/} 设置</Flex>
          </DropdownMenu.Item>
          {/* <DropdownMenu.Item>Share</DropdownMenu.Item> */}
          {/* <DropdownMenu.Item>Add to favorites</DropdownMenu.Item> */}
          {/* <DropdownMenu.Separator /> */}
        </DropdownMenu.Content>
      </DropdownMenu.Root>


      <SettingDialog show={settingVisible} onOpenChange={setSettingVisible} />
    </>
  )
}