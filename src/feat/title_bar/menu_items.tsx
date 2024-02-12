import { PlatformAPI } from "@/ipc";
import useDocumentStore, { saveFile, createNewDoc, closeCurrentDoc } from "@/store/document";
import useNavigationStore, { toggleSidebarExpanded } from "@/store/navigation";
import { Dialog, Flex, Button } from "@radix-ui/themes";
import { SidebarClose, SidebarOpen, SaveIcon, PlusCircleIcon, Search, Settings, TerminalSquare, MoreHorizontal, MoonIcon, Sun } from "lucide-react";
import { useContext } from "react";
import { DialogContext } from "../../components/dialog/DialogContext";
import { TitleMenuItem, TitleMenuItemProps } from "./TitleMenuItem";
import { toast } from "sonner";
import { TitleBarDropdownMenus } from "./TitleBarDropdownMenus";
import { Constants } from "@/utils/constants";
import usePreferenceStore, { setThemeMode } from "@/store/preference";

const iconSize = 16

function ToggleFolderView() {
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


function Save() {
  const saved = useDocumentStore((state) => state.saved);
  const icon = <SaveIcon size={iconSize} />
  const props: TitleMenuItemProps = {
    icon: icon,
    label: '保存',
    onClick: async () => {
      console.log("Saving...")
      const res = await saveFile()
      if (res) {
        toast.success("保存成功")
      } else {
        toast.error("保存失败")
      }
    },
    isDisabled: saved,
  }
  return <TitleMenuItem props={props} />
}

function NewFile() {
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

function ShowSearch() {
  const props: TitleMenuItemProps = {
    icon: <Search size={iconSize} />,
    label: '搜索',
    onClick: () => { },
    isDisabled: false,
  }
  return <TitleMenuItem props={props} />

}

function OpenDevTool() {
  if (Constants.isTauri) {
    return <></>
  }
  const openDevToolMenuItem: TitleMenuItemProps = {
    icon: <TerminalSquare size={iconSize} />,
    label: '开发者工具',
    onClick: () => PlatformAPI.openDevTools(),
    isDisabled: false,
  }
  return <TitleMenuItem props={openDevToolMenuItem} />
}

function ToggleThemeMode() {
  const themeMode = usePreferenceStore(s => s.themeMode())
  const menuItem: TitleMenuItemProps = {
    icon: themeMode === "light" ? <Sun size={iconSize} /> : <MoonIcon size={iconSize} />,
    label: '主题模式',
    onClick: () => {
      setThemeMode(themeMode === "light" ? "dark" : "light")
    },
    isDisabled: false,
  }
  return <TitleMenuItem props={menuItem} />
}

function MoreMenuItem() {
  const moreMenuItem: TitleMenuItemProps = {
    icon: <MoreHorizontal size={iconSize} />,
    label: "更多..."
  }
  return <TitleMenuItem props={moreMenuItem} />
}

export const titleBarMenuItems = [
  <ToggleFolderView key={"ToggleFolderViewMenuItem"} />,
  <Save key={"SaveMenuItem"} />,
  <NewFile key={"NewFileMenuItem"} />,
  <OpenDevTool key={"OpenDevToolMenuItem"} />,
  <ToggleThemeMode key={"ToggleThemeMode"} />,
  // <SearchMenuItem key={"SearchMenuItem"} />,
  // <ExportMenuItem key={"ExportMenuItem"} />
  <TitleBarDropdownMenus key={"MoreMenuItem"}>
    <MoreMenuItem />
  </TitleBarDropdownMenus>
]