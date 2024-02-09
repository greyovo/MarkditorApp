import { Dialog, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Button, DialogContent, DialogDescription, DialogTitle, TextField } from "@radix-ui/themes";
import { DialogProps } from "./DialogProps";
import { useState } from "react";
import { PlatformAPI } from "@/ipc";
import { renameDirectory, renameFile } from "@/store/directory";
import { toast } from "sonner";
import { isMarkdownFile, validateDirectoryName, validateFileName } from "@/utils/path";

export function RenameDialog({ show, entity, onOpenChange }: DialogProps) {
  const [inputName, setInputName] = useState("");

  async function confirm() {
    // TODO RenameDialog
    onOpenChange(false);
    let result = false
    let finalName
    if (entity.type === "file") {
      finalName = validateFileName(inputName);
      result = await renameFile(entity, finalName);
    } else {
      finalName = validateDirectoryName(inputName);
      result = await renameDirectory(entity, finalName);
    }
    if (result) {
      toast.success("重命名成功", {
        description: finalName
      });
    } else {
      toast.error("重命名失败", {
        description: "文件或目录已存在"
      })
    }
    // clear state
    setInputName("");
  }

  return (
    <Dialog open={show} onOpenChange={onOpenChange}>
      <DialogContent className="w-[400px]">
        <DialogHeader className="mb-2">
          <DialogTitle>重命名</DialogTitle>
          <DialogDescription>
            输入新的{entity.type === "dir" ? "文件夹" : "文件"}名：
            <TextField.Input my="2" value={inputName} placeholder={entity.name}
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
