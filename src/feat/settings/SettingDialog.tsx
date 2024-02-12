import { ReactNode, useState } from 'react';
// import { Dialog, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Dialog, Button, DialogContent, DialogDescription, DialogTitle, Kbd, TextField, Flex, DropdownMenu, Select, Link, Separator, Switch, TextFieldInput } from "@radix-ui/themes";
import { PlatformAPI } from '@/ipc';

type SettingItemProps = {
  title: string,
  subtitle: string,
  trailing: ReactNode
}

const SettingItem = ({ title, subtitle, trailing }: SettingItemProps) => {
  return (
    <Flex justify={"between"} align={"center"}>
      <Flex direction={"column"} gap={"1"}>
        <div className=''>{title}</div>
        {subtitle.length > 0 && <div className='text-xs opacity-30'>{subtitle}</div>}
      </Flex>
      {trailing}
    </Flex>
  )
}

export const SettingDialog = ({ show, onOpenChange }: { show: boolean, onOpenChange: (v: boolean) => void }) => {
  const [themeMode, setThemeMode] = useState('light');
  const [showTopStatusBar, setShowTopStatusBar] = useState(true);

  function closeDialog() {
    onOpenChange(false);
  }

  function openUrl(url: string): void {
    PlatformAPI.openInBrowser(url)
  }

  return (
    <Dialog.Root open={show} onOpenChange={onOpenChange}>
      <DialogContent>
        {/* <DialogHeader className="mb-2"> */}
        <DialogTitle>设置</DialogTitle>
        {/* <Separator className='w-full' /> */}

        {/* </DialogHeader> */}
        <Flex direction={"column"} gap={"3"} my={"5"}>

          <SettingItem title={'主题模式'} subtitle={'浅色、深色或跟随系统'}
            trailing={
              <Select.Root defaultValue="system">
                <Select.Trigger className='w-[100px]' />
                <Select.Content>
                  <Select.Item value="light">浅色</Select.Item>
                  <Select.Item value="dark">深色</Select.Item>
                  <Select.Item value="system">跟随系统</Select.Item>
                </Select.Content>
              </Select.Root>}
          />

          <SettingItem title={'自动保存'} subtitle={''}
            trailing={<Switch defaultChecked />}
          />

          <SettingItem title={'自动保存间隔'} subtitle={'单位：毫秒'}
            trailing={<TextFieldInput className='w-[100px]' />}
          />
        </Flex>

        <Separator className='w-full' />
        <DialogDescription className='opacity-55 my-4 text-sm'>
          Markditor is open-source on <Link onClick={() => openUrl("https://github.com/greyovo/MarkditorApp")}>Github</Link>.<br></br>
          © 2024 <Link onClick={() => openUrl("https://github.com/greyovo")}>@greyovo</Link>. All rights reserved.

        </DialogDescription>

        {/* <DialogFooter className="mt-2"> */}
        <Flex gap="3" justify="end">
          <Button onClick={closeDialog}>
            关闭
          </Button>
        </Flex>
        {/* </DialogFooter> */}
      </DialogContent>
    </Dialog.Root>
  );
};
