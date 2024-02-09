import { Dialog, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Button, DialogContent, DialogDescription, DialogTitle, Kbd, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { DialogProps } from "./DialogProps";
import { getParentDirectory, isMarkdownFile } from "@/utils/path";
import { PlatformAPI } from "@/ipc";
import { toast } from "sonner";
import { createDirectory, createFile } from "@/store/directory";

export function CreateDialog({ show, entity, onOpenChange, newItemType }:
  DialogProps & { newItemType: "dir" | "file"; }) {
  const [inputName, setInputName] = useState("");
  const targetDir = entity.type === "dir" ? entity : getParentDirectory(entity.path);


  async function confirm() {
    let result = false
    switch (newItemType) {
      case "dir":
        result = await createDirectory(targetDir, inputName)
        break;
      case "file":
        result = await createFile(targetDir, inputName)
        break;
    }
    onOpenChange(false);
    if (result) {
      toast.success(`创建成功: ${inputName}`);
    } else {
      toast.error(`无法创建文件: ${inputName}`, {
        description: "文件已存在或无法访问"
      });
    }
    setInputName("");
  }


  const newItemTypeStr = newItemType === "dir" ? "文件夹" : "文件"

  return (
    <Dialog open={show} onOpenChange={onOpenChange}>
      <DialogContent className="w-[400px]">
        <DialogHeader className="mb-2">
          <DialogTitle>新建{newItemTypeStr}</DialogTitle>
          <DialogDescription>
            在<Kbd mx="1"> {targetDir.name} </Kbd>下新建{newItemTypeStr}：
            <TextField.Input
              my="2" value={inputName} placeholder={`请输入${newItemTypeStr}名`}
              onInput={(e) => setInputName(e.currentTarget.value)}
            />
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-2">
          <Button variant="soft" onClick={() => onOpenChange(false)}>取消</Button>
          <Button onClick={confirm} disabled={inputName.trim().length === 0}>确定</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}