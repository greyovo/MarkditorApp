import { PlatformAPI } from "@/ipc";
import useDocumentStore, { saveFile, createNewDoc } from "@/store/document";
import useNavigationStore, { toggleSidebarExpanded } from "@/store/navigation";
import { Dialog, Flex, Button } from "@radix-ui/themes";
import { SidebarClose, SidebarOpen, SaveIcon, PlusCircleIcon, Search, Code2Icon, Share, Settings } from "lucide-react";
import { useContext } from "react";
import { DialogContext } from "../dialog/DialogContext";
import { TitleMenuItem, TitleMenuItemProps } from "./TitleMenuItem";

const iconSize = 16

function ToggleFolderViewMenuItem() {
  const open = useNavigationStore((state) => state.sidebarExpanded);
  let icon
  if (open) {
    icon = <SidebarClose size={iconSize} />
  } else {
    icon = <SidebarOpen size={iconSize} />
  }

  const props: TitleMenuItemProps = {
    icon: icon,
    label: '侧边栏',
    onClick: () => {
      console.log("toggle!");
      toggleSidebarExpanded()
    },
    isDisabled: false,
  }

  return <TitleMenuItem props={props} />
}


function SaveMenuItem() {
  const saved = useDocumentStore((state) => state.saved);
  const icon = <SaveIcon size={iconSize} />
  const props: TitleMenuItemProps = {
    icon: icon,
    label: '保存',
    onClick: () => {
      console.log("Saving...")
      saveFile()
    },
    isDisabled: saved,
  }
  return <TitleMenuItem props={props} />


}

function NewFileMenuItem() {
  const saved = useDocumentStore((state) => (state.saved));
  console.log("已经保存", saved);

  const props: TitleMenuItemProps = {
    icon: <PlusCircleIcon size={iconSize} />,
    label: '新建文件',
    onClick: () => {
      if (saved) {
        createNewDoc()
      }
    },
    isDisabled: false,
  }

  if (saved) {
    return <TitleMenuItem props={props} />
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div onClick={props.onClick}>
          <TitleMenuItem props={props} />
        </div>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>文件未保存</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          在新建文件前保存当前文件的修改吗？
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              点错了
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button variant="soft" color="red" onClick={createNewDoc}>
              不保存
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={saveFile}>保存</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

function SearchMenuItem() {
  const props: TitleMenuItemProps = {
    icon: <Search size={iconSize} />,
    label: '搜索',
    onClick: () => { },
    isDisabled: false,
  }
  return <TitleMenuItem props={props} />

}

function ExportMenuItem() {
  const props: TitleMenuItemProps = {
    icon: <Share size={iconSize} />,
    label: '导出...',
    onClick: () => { },
    isDisabled: false,
  }
  return <TitleMenuItem props={props} />

}

function OpenDevToolMenuItem() {
  const openDevToolMenuItem: TitleMenuItemProps = {
    icon: <Code2Icon size={iconSize} />,
    label: '开发者工具',
    onClick: () => PlatformAPI.openDevTools(),
    isDisabled: false,
  }
  return <TitleMenuItem props={openDevToolMenuItem} />
}

function SettingsMenuItem() {
  const { openDialog } = useContext(DialogContext);

  const settingsMenuItem: TitleMenuItemProps = {
    icon: <Settings size={iconSize} />,
    label: '设置',
    onClick: () => {
      
    },
    isDisabled: false,
  }
  return <TitleMenuItem props={settingsMenuItem} />
}

export const titleBarMenuItems = [
  <ToggleFolderViewMenuItem key={ "ToggleFolderViewMenuItem"} />,
  <SaveMenuItem key={ "SaveMenuItem"} />,
  <NewFileMenuItem key={ "NewFileMenuItem"} />,
  <OpenDevToolMenuItem key={"OpenDevToolMenuItem"} />,
  // <SearchMenuItem key={"SearchMenuItem"} />,
  <ExportMenuItem key={ "ExportMenuItem"} />
]