import { refreshRootDir, selectFile, selectRootDir, setFileByPath, setRootDirByPath } from "@/store/directory";
import { DropdownMenu, Button, Flex } from "@radix-ui/themes";
import { SettingDialog } from "../settings/SettingDialog";
import { useState } from "react";
import { dialogActions } from "@/store/dialog";
import usePreferenceStore, { prefActions } from "@/store/preference";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const HistoryItems = () => {
  const { t } = useTranslation()

  const fileHistory = usePreferenceStore((state) => state.fileHistory)
  const folderHistory = usePreferenceStore((state) => state.folderHistory)
  const isAllEmpty = fileHistory.length === 0 && folderHistory.length === 0

  const fileLabel = fileHistory.length === 0 ? t("history.empty_files") : t("history.recent_files")
  const folderLabel = folderHistory.length === 0 ? t("history.empty_folders") : t("history.recent_folders")

  function handleClearHistory() {
    toast(i18next.t("history.clear_confirm_text"), {
      id: "clear-history",
      position: "top-center",
      action: {
        label: (
          <Button size={"1"}>{i18next.t("confirm")}</Button>
        ),
        onClick: () => {
          prefActions.clearAllHistory()
          toast.success(i18next.t("history.clear_success"), { id: "clear-history-success" })
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
      {!isAllEmpty && <DropdownMenu.Item onClick={handleClearHistory}>
        {t("titlebar_dropdown.clear_history")}
      </DropdownMenu.Item>
      }
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
          <DropdownMenu.Item onClick={handleSelectRootDir}>{t("titlebar_dropdown.open_folder")}</DropdownMenu.Item>

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>{t("titlebar_dropdown.recently_open")}</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <HistoryItems />
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>

          {/* <DropdownMenu.Item onClick={closeCurrentDoc}>关闭当前</DropdownMenu.Item> */}

          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={refreshRootDir}>{t("titlebar_dropdown.refresh")}</DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => setSettingVisible(true)}>
            <Flex gap={"2"} align={"center"}>{t("titlebar_dropdown.settings")}</Flex>
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