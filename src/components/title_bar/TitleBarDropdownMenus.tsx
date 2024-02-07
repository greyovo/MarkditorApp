import { refreshRootDir, selectFile, selectRootDir } from "@/store/directory";
import { closeCurrentDoc } from "@/store/document";
import { DropdownMenu, Button } from "@radix-ui/themes";


export function TitleBarDropdownMenus({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div>{children}</div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={selectFile}>打开文件...</DropdownMenu.Item>
        <DropdownMenu.Item onClick={selectRootDir}>打开文件夹...</DropdownMenu.Item>

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
        <DropdownMenu.Item>搜索</DropdownMenu.Item>
        {/* <DropdownMenu.Item>Share</DropdownMenu.Item> */}
        {/* <DropdownMenu.Item>Add to favorites</DropdownMenu.Item> */}
        {/* <DropdownMenu.Separator /> */}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}