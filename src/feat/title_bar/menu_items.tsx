import { PlatformAPI } from "@/ipc";
import useDocumentStore, { saveDocument, createNewDoc } from "@/store/document";
import useNavigationStore, { toggleSidebarExpanded } from "@/store/navigation";
import { SidebarClose, SidebarOpen, SaveIcon, PlusCircleIcon, Search, Settings, TerminalSquare, MoreHorizontal, MoonIcon, Sun } from "lucide-react";
import { TitleMenuItem, TitleMenuItemProps } from "./TitleMenuItem";
import { toast } from "sonner";
import { TitleBarDropdownMenus } from "./TitleBarDropdownMenus";
import { Constants } from "@/utils/constants";
import usePreferenceStore, { setThemeMode } from "@/store/preference";
import { dialogActions } from "@/store/dialog";

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
      const res = await saveDocument()
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

const NewFile = () => {
  const saved = useDocumentStore((state) => (state.saved));
  console.log("已经保存", saved);

  const props: TitleMenuItemProps = {
    icon: <PlusCircleIcon size={iconSize} />,
    label: '新建文件',
    onClick: () => {
      if (useDocumentStore.getState().shouldAlertSave()) {
        dialogActions.toggleUnsaveAlert(true, createNewDoc)
      } else {
        createNewDoc()
      }
    },
    isDisabled: false,
  }

  if (saved) {
    return <TitleMenuItem props={props} />
  }

  return <TitleMenuItem props={props} />

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

export const TitleBarMenuItems = () => (
  <>
    <ToggleFolderView key={"ToggleFolderViewMenuItem"} />
    <NewFile key={"NewFileMenuItem"} />
    <Save key={"SaveMenuItem"} />
    <OpenDevTool key={"OpenDevToolMenuItem"} />
    <ToggleThemeMode key={"ToggleThemeMode"} />
    <TitleBarDropdownMenus key={"MoreMenuItem"}>
      <MoreMenuItem />
    </TitleBarDropdownMenus>
  </>
)