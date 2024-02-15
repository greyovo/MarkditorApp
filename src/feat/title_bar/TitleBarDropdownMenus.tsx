import { refreshRootDir, selectFile, selectRootDir } from "@/store/directory";
import { closeCurrentDoc } from "@/store/document";
import { DropdownMenu, Button, Flex } from "@radix-ui/themes";
import { SettingDialog } from "../settings/SettingDialog";
import { useState } from "react";
import { RefreshCcw, Settings } from "lucide-react";
import { dialogActions } from "@/store/dialog";


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

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div>{children}</div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onClick={handleSelectFile}>打开文件...</DropdownMenu.Item>
          <DropdownMenu.Item onClick={handleSelectRootDir}>打开文件夹...</DropdownMenu.Item>

          {/* TODO  最近打开列表*/}
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>最近打开</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
              <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

              <DropdownMenu.Separator />
              <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
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