import { refreshRootDir, selectRootDir } from "@/store/directory";
import { DropdownMenu, Button } from "@radix-ui/themes";

export function HeaderDropdownMenus({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {children}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={selectRootDir}>打开文件夹...</DropdownMenu.Item>
        {/* <DropdownMenu.Separator /> */}
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>最近打开</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
            <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

            <DropdownMenu.Separator />
            <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

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