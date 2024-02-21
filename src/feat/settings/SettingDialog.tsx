import { ReactNode, useState } from 'react';
import { Dialog, Button, DialogContent, DialogDescription, DialogTitle, Kbd, TextField, Flex, DropdownMenu, Select, Link, Separator, Switch, TextFieldInput, ScrollArea } from "@radix-ui/themes";
import { PlatformAPI } from '@/ipc';
import { cn } from '@/utils';
import usePreferenceStore, { PrefThemeMode, prefActions } from '@/store/preference';

type SettingItemProps = {
  className?: string,
  title: string,
  subtitle: string,
  trailing: ReactNode,
  disabled?: boolean,
}

function openUrl(url: string) {
  PlatformAPI.openInBrowser(url)
}

// function setAsDefaultApp() {
//   PlatformAPI.os.setAsDefaultOpenApp()
// }

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

const AboutApp = () => {
  return (
    <DialogDescription className='flex gap-2 opacity-75 text-xs'>
      <span><b>Markditor</b> is open-source on <Link onClick={() => openUrl("https://github.com/greyovo/MarkditorApp")}>Github</Link>.</span>
      <span>© 2024 <Link onClick={() => openUrl("https://github.com/greyovo")}>@greyovo</Link></span>
    </DialogDescription>
  )
}

export const SettingDialog = ({ show, onOpenChange }: { show: boolean, onOpenChange: (v: boolean) => void }) => {

  function closeDialog() {
    onOpenChange(false)
    prefActions.setAutoSaveInerval(tempAutoSaveInterval)
  }

  const prefThemeMode = usePreferenceStore(s => s.prefThemeMode)
  const autoSave = usePreferenceStore(s => s.autoSave)
  const defaultShowToolbar = usePreferenceStore(s => s.defaultShowToolbar)
  const [tempAutoSaveInterval, setTempAutoSaveInterval] = useState<number>(0)
  const autoSaveInerval = usePreferenceStore(s => s.autoSaveInerval)

  return (
    <Dialog.Root open={show} onOpenChange={onOpenChange}>
      <DialogContent className='pr-3'>

        <DialogTitle>设置</DialogTitle>

        <ScrollArea className=' h-[55vh] my-5 pr-5'>
          <Flex direction={"column"} gap={"4"} className=' overflow-y-auto'>
            <SettingItem title={'主题模式'} subtitle={'浅色、深色或跟随系统'}
              trailing={
                <Select.Root value={prefThemeMode}
                  onValueChange={(v) => prefActions.setThemeMode(v as PrefThemeMode)}>
                  <Select.Trigger className='w-[120px]' />
                  <Select.Content>
                    <Select.Item value="light">浅色</Select.Item>
                    <Select.Item value="dark">深色</Select.Item>
                    <Select.Item value="system">跟随系统</Select.Item>
                  </Select.Content>
                </Select.Root>
              }
            />

            <SettingItem title={'自动保存'} subtitle={''}
              trailing={
                <Switch checked={autoSave}
                  onCheckedChange={(v) => prefActions.toggleAutoSave(v)}
                />
              }
            />

            <SettingItem className={!autoSave ? 'opacity-45' : ""} title={'自动保存间隔'} subtitle={'单位：毫秒，不低于 1000 ms'}
              trailing={
                <Flex justify={"end"} align={"center"} gap={"2"}>
                  <TextFieldInput className='w-[90px]'
                    type="number"
                    disabled={!autoSave} defaultValue={autoSaveInerval}
                    onInput={(v) => setTempAutoSaveInterval(Number(v.currentTarget.value))}
                  /> ms
                </Flex>
              }
            />

            <SettingItem title={'默认显示工具栏'} subtitle={'可以在右键菜单中关闭或展示顶部工具栏，下次启动软件生效'}
              trailing={
                <Switch checked={defaultShowToolbar}
                  onCheckedChange={(v) => prefActions.toggleDefaultShowToolbar(v)}
                />
              }
            />

            {/* TODO 设置Markditor为默认打开方式 */}
            {/* <SettingItem title={'设为默认打开方式'}
              subtitle={'设置 Markditor 为系统 Markdown 文件默认打开方式'}
              trailing={
                <Flex justify={"end"} align={"center"} gap={"2"}>
                  <Button onClick={setAsDefaultApp}>设置默认</Button>
                </Flex>
              }
            /> */}
          </Flex>
        </ScrollArea>

        <Flex gap="3" mr={"4"} justify="between" align={"center"}>
          <AboutApp />
          <Button onClick={closeDialog}>确定</Button>
        </Flex>

      </DialogContent>
    </Dialog.Root>
  );
};
