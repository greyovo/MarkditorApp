import { ReactNode, useState } from 'react';
import { Dialog, Button, DialogContent, DialogDescription, DialogTitle, Kbd, TextField, Flex, DropdownMenu, Select, Link, Separator, Switch, TextFieldInput, ScrollArea } from "@radix-ui/themes";
import { PlatformAPI } from '@/ipc';
import { cn } from '@/utils/styles';
import usePreferenceStore, { PrefThemeMode, prefActions } from '@/store/preference';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation()

  return (
    <Dialog.Root open={show} onOpenChange={onOpenChange}>
      <DialogContent className='pr-3'>

        <DialogTitle>{t("settings.title")}</DialogTitle>

        <ScrollArea className=' h-[55vh] my-5 pr-5'>
          <Flex direction={"column"} gap={"4"} className=' overflow-y-auto'>
            <SettingItem title={t("settings.theme_mode.title")} subtitle={t("settings.theme_mode.description")}
              trailing={
                <Select.Root value={prefThemeMode}
                  onValueChange={(v) => prefActions.setThemeMode(v as PrefThemeMode)}>
                  <Select.Trigger className='w-[120px]' />
                  <Select.Content>
                    <Select.Item value="light">{t("settings.theme_mode.item_light")}</Select.Item>
                    <Select.Item value="dark">{t("settings.theme_mode.item_dark")}</Select.Item>
                    <Select.Item value="system">{t("settings.theme_mode.item_system")}</Select.Item>
                  </Select.Content>
                </Select.Root>
              }
            />

            <SettingItem title={t("settings.auto_save.title")} subtitle={t("settings.auto_save.description")}
              trailing={
                <Switch checked={autoSave}
                  onCheckedChange={(v) => prefActions.toggleAutoSave(v)}
                />
              }
            />

            <SettingItem className={!autoSave ? 'opacity-45' : ""}
              title={t("settings.auto_save_interval.title")}
              subtitle={t("settings.auto_save_interval.description")}
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

            <SettingItem title={t("settings.default_show_toolbar.title")} 
            subtitle={t("settings.default_show_toolbar.description")}
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
          <Button onClick={closeDialog}>{t("confirm")}</Button>
        </Flex>

      </DialogContent>
    </Dialog.Root>
  );
};
