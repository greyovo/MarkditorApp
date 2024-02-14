import { ReactNode, useState } from 'react';
import { Dialog, Button, DialogContent, DialogDescription, DialogTitle, Kbd, TextField, Flex, DropdownMenu, Select, Link, Separator, Switch, TextFieldInput, ScrollArea } from "@radix-ui/themes";
import { PlatformAPI } from '@/ipc';
import { cn } from '@/utils';

type SettingItemProps = {
  className?: string,
  title: string,
  subtitle: string,
  trailing: ReactNode,
  disabled?: boolean,
}

const SettingItem = ({ className, title, subtitle, trailing, disabled }: SettingItemProps) => {
  return (
    <Flex justify={"between"} align={"center"}
      className={cn(className, "select-none", disabled ? "opacity-50" : "")}>
      <Flex direction={"column"} gap={"1"}>
        <div className=''>{title}</div>
        {subtitle.length > 0 && <div className='text-xs opacity-50'>{subtitle}</div>}
      </Flex>
      {trailing}
    </Flex>
  )
}

export const SettingDialog = ({ show, onOpenChange }: { show: boolean, onOpenChange: (v: boolean) => void }) => {

  function closeDialog() {
    onOpenChange(false);
  }

  function openUrl(url: string): void {
    PlatformAPI.openInBrowser(url)
  }

  return (
    <Dialog.Root open={show} onOpenChange={onOpenChange}>
      <DialogContent>

        <DialogTitle>设置</DialogTitle>

        <ScrollArea className=' h-[300px] my-5 pr-6'>
          <Flex direction={"column"} gap={"4"} className=' overflow-y-auto'>
            <SettingItem title={'主题模式'} subtitle={'浅色、深色或跟随系统'}
              trailing={
                <Select.Root defaultValue="system">
                  <Select.Trigger className='w-[120px]' />
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

            <SettingItem className=' opacity-45' title={'自动保存间隔'} subtitle={'单位：毫秒'}
              trailing={
                <Flex justify={"end"} align={"center"} gap={"2"}>
                  <TextFieldInput disabled className='w-[90px]' /> ms
                </Flex>
              }
            />
          </Flex>


        </ScrollArea>

        <Flex gap="3" justify="between" align={"center"}>
          <DialogDescription className='flex gap-2 opacity-50 text-xs'>
            <span><b>Markditor</b> is open-source on <Link onClick={() => openUrl("https://github.com/greyovo/MarkditorApp")}>Github</Link>.</span>
            <span>© 2024 <Link onClick={() => openUrl("https://github.com/greyovo")}>@greyovo</Link></span>
          </DialogDescription>
          <Button onClick={closeDialog}>关闭</Button>
        </Flex>

      </DialogContent>
    </Dialog.Root>
  );
};
