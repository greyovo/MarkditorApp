import { PlatformAPI } from "@/ipc";
import useDocumentStore from "@/store/document_store";
import useNavigationStore from "@/store/navigation_store"
import { ArrowUpOnSquareIcon, CheckCircleIcon, CodeBracketIcon, Cog6ToothIcon, DocumentPlusIcon, ListBulletIcon, MagnifyingGlassIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import { Button, Separator, Tooltip } from "@radix-ui/themes";
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

function AsideMenuBarItem({ props }: { props: AsideMenuBarItemProps }) {
  if (props.isDisabled) {
    return (
      <Button disabled variant='ghost' highContrast className='px-2 py-2 m-1 rounded'
        onClick={() => props.onClick?.()}>
        {props.icon}
      </Button>
    )
  }
  return (
    <Tooltip side='right' content={props.label} delayDuration={0} >
      <Button variant='ghost' highContrast className='px-2 py-2 m-1 rounded'
        onClick={() => props.onClick?.()}>
        {props.icon}
      </Button>
    </Tooltip>
  )
}

function AsideMenuBarSeparator() {
  return <Separator className='w-6 self-center my-0.5' style={{ height: 1.2 }} />
}

// --------------------------------------------------------------------

function ToggleFolderViewMenuItem() {
  const open = useNavigationStore((state) => state.sidebarExpanded);
  let icon
  if (open) {
    icon = <SidebarClose strokeWidth={1.5} width={18} height={18} />
  } else {
    icon = <SidebarOpen strokeWidth={1.5} width={18} height={18} />
  }

  const props: AsideMenuBarItemProps = {
    icon: icon,
    label: '侧边栏',
    onClick: () => {
      console.log("toggle!");
      useNavigationStore.setState({
        sidebarExpanded: !useNavigationStore.getState().sidebarExpanded,
      })
    },
    isDisabled: false,
  }

  return <AsideMenuBarItem props={props} />
}


function SaveMenuItem() {
  const saved = useDocumentStore((state) => state.saved);
  const icon = <SaveIcon strokeWidth={1.5} width={18} height={18} />
  const props: AsideMenuBarItemProps = {
    icon: icon,
    label: '保存',
    onClick: () => {
      console.log("Saving...");
      useDocumentStore.getState().saveFile()
    },
    isDisabled: saved,
  }

  return <AsideMenuBarItem props={props} />
}

function NewFileMenuItem() {
  const props: AsideMenuBarItemProps = {
    icon: <PlusCircleIcon width={20} height={20} />,
    label: '新建文件',
    onClick: () => {

    },
    isDisabled: false,
  }
  return <AsideMenuBarItem props={props} />
}

function SearchMenuItem() {
  const props: AsideMenuBarItemProps = {
    icon: <MagnifyingGlassIcon width={20} height={20} />,
    label: '搜索',
    onClick: () => { },
    isDisabled: false,
  }
  return <AsideMenuBarItem props={props} />

}

function ExportMenuItem() {
  const props: AsideMenuBarItemProps = {
    icon: <ArrowUpOnSquareIcon width={20} height={20} />,
    label: '导出...',
    onClick: () => { },
    isDisabled: false,
  }
  return <AsideMenuBarItem props={props} />

}

function OpenDevToolMenuItem() {
  const openDevToolMenuItem: AsideMenuBarItemProps = {
    icon: <CodeBracketIcon width={20} height={20} />,
    label: '开发者工具',
    onClick: () => PlatformAPI.openDevTools(),
    isDisabled: false,
  }
  return <AsideMenuBarItem props={openDevToolMenuItem} />
}

function SettingsMenuItem() {
  const settingsMenuItem: AsideMenuBarItemProps = {
    icon: <Cog6ToothIcon width={20} height={20} />,
    label: '设置',
    onClick: () => { },
    isDisabled: false,
  }
  return <AsideMenuBarItem props={settingsMenuItem} />
}


export const sidebarTopItems = [
  <ToggleFolderViewMenuItem key={"ToggleFolderViewMenuItem"} />,
  <AsideMenuBarSeparator key={"AsideMenuBarSeparator"} />,
  <SaveMenuItem key={"SaveMenuItem"}/>,
  <NewFileMenuItem key={"NewFileMenuItem"} />,
  <SearchMenuItem key={"SearchMenuItem"} />,
  <ExportMenuItem key={"ExportMenuItem"} />
]

export const sidebarBottomItems = [
  <OpenDevToolMenuItem key={"OpenDevToolMenuItem"} />,
  <SettingsMenuItem key={"SettingsMenuItem"} />
]
