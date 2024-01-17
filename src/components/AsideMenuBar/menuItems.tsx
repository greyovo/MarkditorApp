import { PlatformAPI } from "@/ipc";
import useNavigationStore from "@/store/navigation_store"
import { ArrowUpOnSquareIcon, CodeBracketIcon, Cog6ToothIcon, DocumentPlusIcon, ListBulletIcon, MagnifyingGlassIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import { Separator } from "@radix-ui/themes";
import { SaveIcon, SidebarClose, SidebarIcon, SidebarOpen } from "lucide-react";
import { useState } from "react";

export interface AsideMenuBarItemProps {
  icon: React.ReactNode,
  label: string,
  onClick?: () => void,
  isDisabled?: boolean,
  className?: string,
  isSeparator?: boolean
}

function StatefulFolderViewIcon() {
  const open = useNavigationStore().sidebarExpanded;

  if (open) {
    return <SidebarClose strokeWidth={1.5} width={18} height={18} />
  } else {
    return <SidebarOpen strokeWidth={1.5} width={18} height={18} />
  }
}

const toggleFolderViewMenuItem: AsideMenuBarItemProps = {
  icon: <StatefulFolderViewIcon />,
  label: '侧边栏',
  onClick: () => {
    console.log("toggle!");
    useNavigationStore.setState({
      sidebarExpanded: !useNavigationStore.getState().sidebarExpanded,
    })
  },
  isDisabled: false,
}

function StatefulSaveIcon() {
  const [isSaving, setIsSaving] = useState(false);
  return (
    <SaveIcon
      strokeWidth={1.5}
      width={18}
      height={18}
      className={isSaving ? 'animate-spin' : ''}
    />
  );
}

const saveMenuItem: AsideMenuBarItemProps = {
  icon: <StatefulSaveIcon />,
  label: '保存',
  onClick: () => {
  },
  isDisabled: false,
}

const newFileMenuItem: AsideMenuBarItemProps = {
  icon: <PlusCircleIcon width={20} height={20} />,
  label: '新建文件',
  onClick: () => {

  },
  isDisabled: false,
}

const searchMenuItem: AsideMenuBarItemProps = {
  icon: <MagnifyingGlassIcon width={20} height={20} />,
  label: '搜索',
  onClick: () => { },
  isDisabled: false,
}

const exportMenuItem: AsideMenuBarItemProps = {
  icon: <ArrowUpOnSquareIcon width={20} height={20} />,
  label: '导出...',
  onClick: () => { },
  isDisabled: false,
}

const openDevToolMenuItem: AsideMenuBarItemProps = {
  icon: <CodeBracketIcon width={20} height={20} />,
  label: '开发者工具',
  onClick: () => PlatformAPI.openDevTools(),
  isDisabled: false,
}

const settingsMenuItem: AsideMenuBarItemProps = {
  icon: <Cog6ToothIcon width={20} height={20} />,
  label: '设置',
  onClick: () => { },
  isDisabled: false,
}

const separatorItem: AsideMenuBarItemProps = {
  icon: <Separator />,
  label: "",
  onClick: () => { },
  isDisabled: true,
  isSeparator: true,
}


export const sidebarTopItems: AsideMenuBarItemProps[] = [
  toggleFolderViewMenuItem,
  separatorItem,
  saveMenuItem,
  newFileMenuItem,
  // separatorItem,
  searchMenuItem,
  exportMenuItem,
]

export const sidebarBottomItems: AsideMenuBarItemProps[] = [
  openDevToolMenuItem,
  settingsMenuItem
]
