import { Button, Dialog, DialogContent, DialogDescription, DialogTitle, Flex, Kbd, TextField } from "@radix-ui/themes";
import { DialogProps } from "./DialogProps";
import { useState } from "react";
import { PlatformAPI } from "@/ipc";
import { renameDirectory, renameFile } from "@/store/directory";
import { toast } from "sonner";
import { isMarkdownFile, validateDirectoryName, fixMdFileName } from "@/utils/path";

export function RenameDialog({ show, entity, onOpenChange }: DialogProps) {
  const [inputName, setInputName] = useState(entity.name);
  // const [reset, setReset] = useState(false);
  // if (reset) {
  //   setInputName(entity.name)
  //   setReset(false)
  // }

  async function confirm() {
    if (!validateDirectoryName(inputName)) {
      toast.error("重命名失败", { description: "文件或目录名含有非法字符" });
      onOpenChange(false)
      return
    }

    let result = false
    let finalName = inputName.trim()

    if (entity.type === "file") {
      finalName = fixMdFileName(inputName);
      result = await renameFile(entity, finalName);
    } else {
      result = await renameDirectory(entity, finalName);
    }

    if (result) {
      toast.success("重命名成功", { description: finalName });
    } else {
      toast.error("重命名失败", { description: "文件或目录已存在" })
    }
    // clear state
    onOpenChange(false);
    // setReset(true)
  }

  return (
    <Dialog.Root open={show} onOpenChange={onOpenChange}>
      <DialogContent className="w-[400px]">
        <DialogTitle>重命名</DialogTitle>
        <DialogDescription>
          输入新的{entity.type === "dir" ? "文件夹" : "文件"}名：
          <TextField.Input
            my="2" value={inputName} placeholder={entity.name}
            onInput={(e) => setInputName(e.currentTarget.value)}
            onKeyUp={(e) => e.key === "Enter" && confirm()}
          />
        </DialogDescription>

        <Flex justify={"end"} gap={"2"}>
          <Button variant="soft" onClick={() => onOpenChange(false)}>取消</Button>
          <Button onClick={confirm} disabled={inputName.trim().length === 0}>确定</Button>
        </Flex>
      </DialogContent>
    </Dialog.Root>
  );
}
