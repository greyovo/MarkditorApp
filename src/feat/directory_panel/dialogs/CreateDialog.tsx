import { Dialog, Button, DialogContent, DialogDescription, DialogTitle, Kbd, TextField, Flex, DropdownMenu, Select, Link, Separator, Switch, TextFieldInput } from "@radix-ui/themes";
import { useState } from "react";
import { DialogProps } from "./DialogProps";
import { getParentDirectory, isMarkdownFile, validateDirectoryName, fixMdFileName } from "@/utils/path";
import { PlatformAPI } from "@/ipc";
import { toast } from "sonner";
import { createDirectory, createFile } from "@/store/directory";

export function CreateDialog({ show, entity, onOpenChange, newItemType }:
  DialogProps & { newItemType: "dir" | "file"; }) {
  const [inputName, setInputName] = useState("");
  const targetDir = entity.type === "dir" ? entity : getParentDirectory(entity.path);

  async function confirm() {
    let result = false
    if (!validateDirectoryName(inputName)) {
      toast.error("创建失败", { description: "文件或目录名含有非法字符" });
      onOpenChange(false)
      setInputName("");
      return
    }
    let finalName = inputName.trim()
    switch (newItemType) {
      case "file":
        finalName = fixMdFileName(inputName);
        result = await createFile(targetDir, finalName)
        break;
      case "dir":
        result = await createDirectory(targetDir, finalName)
        break;
    }
    if (result) {
      toast.success(`创建成功: ${finalName}`);
    } else {
      toast.error(`无法创建: ${finalName}`, { description: "文件已存在或无法访问" });
    }
    onOpenChange(false);
    setInputName("");
  }


  const newItemTypeStr = newItemType === "dir" ? "文件夹" : "文件"

  return (
    <Dialog.Root open={show} onOpenChange={onOpenChange}>
      <DialogContent className="w-[400px]">
        <DialogTitle>新建{newItemTypeStr}</DialogTitle>
        <DialogDescription className="my-3">
          在<Kbd mx="1"> {targetDir.name} </Kbd>下新建{newItemTypeStr}：
          <TextField.Input
            my="2" value={inputName} placeholder={`请输入${newItemTypeStr}名`}
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
